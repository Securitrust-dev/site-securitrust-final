/*
 * Suivi des leads (dataLayer GTM → GA4) et envoi des formulaires de rappel des
 * landing pages statiques. Chargé sur TOUTES les pages : public/*.html via
 * `npm run chrome:sync`, pages React via src/app/layout.tsx.
 *
 * Événements poussés dans window.dataLayer (à relayer en GA4 par GTM) :
 *   lead_form_start  1re saisie dans un formulaire de lead      form_id, form_location
 *   generate_lead    lead enregistré par l'API (réponse 2xx)    form_id, form_location, lead_service
 *   lead_form_error  échec d'envoi (réseau / API)               form_id, form_location, error_type
 *   calendly_click   clic vers Calendly                         link_location, link_text
 *   calendly_booking rendez-vous pris dans le widget intégré    form_location
 *   phone_click      clic sur un lien tel:                      link_location
 *   email_click      clic sur un lien mailto:                   link_location
 * Les pages React poussent generate_lead / lead_form_error elles-mêmes
 * (src/lib/analytics.ts) ; ce script s'occupe du reste.
 *
 * PostHog : tous ces événements lui sont aussi relayés (sans e-mail ni téléphone).
 * Sur les pages statiques, ce script charge PostHog lui-même (voir startPostHog) ;
 * sur les pages React, c'est src/instrumentation-client.ts.
 */
(function () {
  if (window.__stTracking) return;
  window.__stTracking = true;

  var dl = (window.dataLayer = window.dataLayer || []);
  function track(event, params) {
    var payload = { event: event, form_location: location.pathname };
    for (var k in params) if (params[k] !== undefined) payload[k] = params[k];
    dl.push(payload);
    phCapture(event, payload);
  }
  window.stTrack = track;

  // Relais PostHog : sans les champs techniques ni les données personnelles (user_data).
  function phCapture(event, props) {
    var ph = window.posthog;
    if (!ph || typeof ph.capture !== 'function') return;
    var clean = {};
    for (var k in props) if (k !== 'event' && k !== 'user_data' && props[k] !== undefined) clean[k] = props[k];
    ph.capture(event, clean);
  }
  window.stPhCapture = phCapture;

  function zone(el) {
    if (el.closest('#sc-header')) return 'header';
    if (el.closest('#sc-footer')) return 'footer';
    var sec = el.closest('[id]');
    return sec ? sec.id : 'page';
  }

  // Clics sortants à valeur commerciale (délégués : couvre aussi la navigation React).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var text = (a.textContent || '').trim().slice(0, 80);
    if (href.indexOf('calendly.com') !== -1) track('calendly_click', { link_location: zone(a), link_text: text });
    else if (href.indexOf('tel:') === 0) track('phone_click', { link_location: zone(a) });
    else if (href.indexOf('mailto:') === 0) track('email_click', { link_location: zone(a) });
  });

  // Début de saisie, une fois par formulaire.
  document.addEventListener('focusin', function (e) {
    var form = e.target.closest && e.target.closest('form[data-lead-form]');
    if (!form || form.__stStarted) return;
    form.__stStarted = true;
    track('lead_form_start', { form_id: form.getAttribute('data-lead-form') });
  });

  // Widget Calendly intégré (/prise-de-rdv) : rendez-vous effectivement pris.
  window.addEventListener('message', function (e) {
    if (!/(^|\.)calendly\.com$/.test((e.origin || '').replace(/^https?:\/\//, ''))) return;
    if (e.data && e.data.event === 'calendly.event_scheduled') track('calendly_booking', {});
  });

  // Téléphone au format E.164 (FR par défaut), attendu par les conversions améliorées.
  function e164(raw) {
    var d = raw.replace(/[^\d+]/g, '');
    if (!d) return undefined;
    if (d.charAt(0) === '+') return d;
    if (d.indexOf('00') === 0) return '+' + d.slice(2);
    if (d.charAt(0) === '0' && d.length === 10) return '+33' + d.slice(1);
    return undefined;
  }

  // Captcha anti-spam Cloudflare Turnstile des formulaires statiques. La clé publique est
  // lue sur GET /api/contact au premier focus ou clic dans un formulaire ; sans clé
  // (captcha non configuré), rien ne change. Widget « interaction-only » : invisible sauf
  // si Cloudflare exige une interaction du visiteur.
  var TS_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  var tsKeyPromise = null;
  var tsScriptPromise = null;

  // Configuration publique (clés captcha et PostHog), lue une fois par page.
  var configPromise = null;
  function siteConfig() {
    if (!configPromise) {
      configPromise = fetch('/api/contact', { method: 'GET', credentials: 'same-origin' })
        .then(function (res) { return res.ok ? res.json() : {}; })
        .catch(function () { configPromise = null; return {}; });
    }
    return configPromise;
  }

  function captchaKey() {
    if (!tsKeyPromise) {
      tsKeyPromise = siteConfig().then(function (data) { return (data && data.turnstileSiteKey) || ''; });
    }
    return tsKeyPromise;
  }

  /* ─── PostHog sur les pages statiques ───────────────────────────────────────
   * Mêmes réglages que src/instrumentation-client.ts (pages React) : sans cookie par
   * défaut, opt-in si le service « posthog » est accepté dans Axeptio, enregistrement
   * de session et heatmaps après accord uniquement. Clé et région lues dans les
   * variables Vercel NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST via /api/contact.
   */
  function isReactPage() {
    return !!document.querySelector('script[src*="/_next/"]');
  }

  function loadPostHog(key, host) {
    if (window.posthog && window.posthog.__loaded) return;
    // Amorce officielle PostHog : file d'attente des appels jusqu'au chargement d'array.js.
    (function (t, e) {
      var o, n, p, r;
      if (e.__SV) return;
      window.posthog = e; e._i = [];
      e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split('.');
          if (o.length == 2) { t = t[o[0]]; e = o[1]; }
          t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
        }
        p = t.createElement('script'); p.type = 'text/javascript'; p.crossOrigin = 'anonymous'; p.async = true;
        p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
        r = t.getElementsByTagName('script')[0]; r.parentNode.insertBefore(p, r);
        var u = e;
        if (a !== undefined) u = e[a] = []; else a = 'posthog';
        u.people = u.people || [];
        u.toString = function (t) { var e = 'posthog'; if (a !== 'posthog') e += '.' + a; if (!t) e += ' (stub)'; return e; };
        u.people.toString = function () { return u.toString(1) + ' (stub)'; };
        o = 'init capture register register_once register_for_session unregister unregister_for_session identify reset get_distinct_id get_session_id set_config startSessionRecording stopSessionRecording captureException opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug'.split(' ');
        for (n = 0; n < o.length; n++) g(u, o[n]);
        e._i.push([i, s, a]);
      };
      e.__SV = 1;
    })(document, window.posthog || []);

    window.posthog.init(key, {
      api_host: host || 'https://eu.i.posthog.com',
      defaults: '2025-05-24',
      person_profiles: 'identified_only',
      cookieless_mode: 'on_reject',
      opt_out_capturing_by_default: true,
      capture_exceptions: true,
      enable_heatmaps: true,
      session_recording: { maskAllInputs: true, maskTextSelector: 'form' },
    });

    window._axcb = window._axcb || [];
    window._axcb.push(function (axeptio) {
      axeptio.on('cookies:complete', function (choices) {
        if (choices && choices.posthog === true) window.posthog.opt_in_capturing();
        else window.posthog.opt_out_capturing();
      });
    });
  }

  function startPostHog() {
    if (isReactPage()) return;
    var done = 0, ev = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
    function go() {
      if (done) return; done = 1;
      ev.forEach(function (e) { window.removeEventListener(e, go, { passive: true }); });
      siteConfig().then(function (cfg) {
        if (cfg && cfg.posthogKey) loadPostHog(cfg.posthogKey, cfg.posthogHost);
      });
    }
    ev.forEach(function (e) { window.addEventListener(e, go, { passive: true }); });
    if (document.readyState === 'complete') setTimeout(go, 5000);
    else window.addEventListener('load', function () { setTimeout(go, 5000); });
  }

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (tsScriptPromise) return tsScriptPromise;
    tsScriptPromise = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = TS_SCRIPT;
      s.async = true;
      s.defer = true;
      s.onload = function () {
        var tries = 0;
        (function check() {
          if (window.turnstile) return resolve(window.turnstile);
          if (++tries > 50) return resolve(null);
          setTimeout(check, 50);
        })();
      };
      s.onerror = function () { tsScriptPromise = null; resolve(null); };
      document.head.appendChild(s);
    });
    return tsScriptPromise;
  }

  // Affiche le widget avant le bouton d'envoi (une seule fois par formulaire).
  function startCaptcha(form) {
    if (form.__stCaptcha) return form.__stCaptcha;
    form.__stCaptcha = captchaKey().then(function (key) {
      if (!key) return null;
      return loadTurnstile().then(function (ts) {
        if (!ts) return null;
        var btn = form.querySelector('button[type="submit"]');
        var box = document.createElement('div');
        box.className = 'st-captcha';
        box.style.maxWidth = '100%';
        box.style.overflow = 'hidden';
        if (btn && btn.parentNode) btn.parentNode.insertBefore(box, btn);
        else form.appendChild(box);
        try {
          return ts.render(box, { sitekey: key, appearance: 'interaction-only', language: 'fr', action: 'lead' });
        } catch (err) {
          return null;
        }
      });
    });
    return form.__stCaptcha;
  }

  // Jeton du formulaire : attend au plus 6 s qu'il soit prêt ; chaîne vide sans captcha.
  function captchaToken(form) {
    var deadline = Date.now() + 6000;
    function read() {
      var input = form.querySelector('input[name="cf-turnstile-response"]');
      return input ? String(input.value || '').trim() : '';
    }
    return startCaptcha(form).then(function (widgetId) {
      if (widgetId === null || widgetId === undefined) return '';
      return new Promise(function (resolve) {
        (function poll() {
          var t = read();
          if (t || Date.now() >= deadline) return resolve(t);
          setTimeout(poll, 150);
        })();
      });
    }).catch(function () { return ''; });
  }

  // Nouveau défi après un envoi (réussi ou non) : un jeton ne sert qu'une fois.
  function resetCaptcha(form) {
    if (!form.__stCaptcha) return;
    form.__stCaptcha.then(function (widgetId) {
      if (widgetId !== null && widgetId !== undefined && window.turnstile) {
        try { window.turnstile.reset(widgetId); } catch (err) { /* widget retiré */ }
      }
    });
  }

  // Formulaires de rappel des landing pages statiques : envoi réel vers /api/contact.
  function bindStaticForm(form) {
    var btn = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.lead-status');
    var label = btn ? btn.textContent : '';
    var formId = form.getAttribute('data-lead-form');

    function show(kind, html) {
      status.className = 'lead-status lead-status--' + kind;
      status.innerHTML = html;
      status.hidden = false;
    }

    // Captcha chargé au premier focus ou clic dans le formulaire, pas au chargement de la page.
    function onFirstInteraction() {
      form.removeEventListener('focusin', onFirstInteraction);
      form.removeEventListener('click', onFirstInteraction);
      startCaptcha(form);
    }
    form.addEventListener('focusin', onFirstInteraction);
    form.addEventListener('click', onFirstInteraction);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.__stSending) return;
      var fd = new FormData(form);
      if (fd.get('website')) return; // pot de miel anti-spam
      form.__stSending = true;
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';
      status.hidden = true;

      captchaToken(form)
        .then(function (turnstileToken) {
          return fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: fd.get('name'),
              email: fd.get('email'),
              phone: fd.get('phone'),
              company: fd.get('company') || undefined,
              subject: form.getAttribute('data-subject'),
              message: form.getAttribute('data-message') || undefined,
              source: form.getAttribute('data-source'),
              turnstileToken: turnstileToken || undefined,
            }),
          });
        })
        .then(function (res) {
          if (!res.ok) throw new Error('http_' + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function (data) {
          // lead_id : dédoublonnage Google Ads ; user_data : conversions améliorées
          // (haché en SHA-256 par GTM). user_data est vidé juste après.
          var email = String(fd.get('email') || '').trim().toLowerCase();
          var phone = e164(String(fd.get('phone') || ''));
          track('generate_lead', {
            form_id: formId,
            lead_service: form.getAttribute('data-service'),
            lead_id: data && data.leadId,
            user_data: email || phone ? { email: email || undefined, phone_number: phone } : undefined,
          });
          dl.push({ user_data: undefined });
          // La saisie n'est vidée qu'une fois le lead enregistré.
          form.reset();
          var download = form.getAttribute('data-download');
          if (download) {
            // Lead magnet : on déclenche le téléchargement du PDF et on invite à le relancer.
            track('file_download', { form_id: formId, file_name: download });
            var a = document.createElement('a');
            a.href = download;
            a.setAttribute('download', '');
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            show(
              'ok',
              '<strong>Merci, votre document arrive.</strong> Le téléchargement a démarré. ' +
                'S’il ne se lance pas, <a href="' + download + '" download>cliquez ici</a>.'
            );
          } else {
            show(
              'ok',
              '<strong>Demande bien reçue.</strong> Un expert vous rappelle sous 2h ouvrées. ' +
                'Vous préférez fixer l’horaire ? <a href="https://calendly.com/expert-securitrust" target="_blank" rel="noopener noreferrer">Réservez un créneau</a>.'
            );
          }
        })
        .catch(function (err) {
          track('lead_form_error', { form_id: formId, error_type: String(err && err.message || 'network') });
          // Adresse non professionnelle refusée par /api/contact (src/lib/email-pro.ts) :
          // rien n'a été transmis, le visiteur corrige son adresse.
          if (err && err.message === 'http_422') {
            var emailInput = form.querySelector('input[name="email"]');
            if (emailInput) emailInput.focus();
            show(
              'err',
              'Merci d’indiquer votre adresse e-mail professionnelle (les messageries personnelles et les adresses jetables ne sont pas acceptées).'
            );
            return;
          }
          // Saisie conservée : le visiteur peut réessayer ou nous joindre directement.
          show(
            'err',
            'L’envoi n’a pas abouti, votre saisie est conservée. Réessayez, ou contactez-nous au ' +
              '<a href="tel:+33186044431">01 86 04 44 31</a> / <a href="mailto:expertise@securitrust.fr">expertise@securitrust.fr</a>.'
          );
        })
        .then(function () {
          resetCaptcha(form);
          form.__stSending = false;
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-lead-static]');
    for (var i = 0; i < forms.length; i++) bindStaticForm(forms[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  startPostHog();
})();
