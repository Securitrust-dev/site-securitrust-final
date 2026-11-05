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
 */
(function () {
  if (window.__stTracking) return;
  window.__stTracking = true;

  var dl = (window.dataLayer = window.dataLayer || []);
  function track(event, params) {
    var payload = { event: event, form_location: location.pathname };
    for (var k in params) if (params[k] !== undefined) payload[k] = params[k];
    dl.push(payload);
  }
  window.stTrack = track;

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

  function captchaKey() {
    if (!tsKeyPromise) {
      tsKeyPromise = fetch('/api/contact', { method: 'GET', credentials: 'same-origin' })
        .then(function (res) { return res.ok ? res.json() : {}; })
        .then(function (data) { return (data && data.turnstileSiteKey) || ''; })
        .catch(function () { tsKeyPromise = null; return ''; });
    }
    return tsKeyPromise;
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
})();
