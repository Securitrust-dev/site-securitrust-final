// Filtre des adresses e-mail non professionnelles (messageries grand public, fournisseurs
// d'accès, adresses jetables). Source unique, utilisée par les formulaires (contrôle dans
// le navigateur) et par /api/contact et /api/lead (contrôle serveur, qui fait foi).
// Les pages statiques (public/site-tracking.js) s'appuient sur la réponse serveur
// (422 { error: 'personal_email' }).

/** Domaines grand public et jetables connus (comparaison exacte ou sous-domaine). */
export const PERSONAL_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  // Google, Microsoft, Yahoo, Apple, AOL
  'gmail.com', 'googlemail.com',
  'hotmail.com', 'hotmail.fr', 'hotmail.co.uk', 'hotmail.be', 'hotmail.it', 'hotmail.es', 'hotmail.de',
  'outlook.com', 'outlook.fr', 'outlook.be', 'outlook.de', 'outlook.es', 'outlook.it',
  'live.com', 'live.fr', 'live.be', 'live.co.uk', 'msn.com', 'passport.com', 'windowslive.com',
  'yahoo.com', 'yahoo.fr', 'yahoo.co.uk', 'yahoo.be', 'yahoo.es', 'yahoo.it', 'yahoo.de', 'ymail.com', 'rocketmail.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'aol.fr', 'aim.com',
  // Autres messageries internationales
  'gmx.com', 'gmx.fr', 'gmx.de', 'gmx.net', 'mail.com', 'email.com', 'usa.com',
  'protonmail.com', 'protonmail.ch', 'proton.me', 'pm.me',
  'zoho.com', 'zohomail.com', 'zohomail.eu',
  'tutanota.com', 'tutanota.de', 'tuta.io', 'tuta.com', 'tutamail.com',
  'mailfence.com', 'fastmail.com', 'fastmail.fm', 'hushmail.com', 'posteo.de', 'posteo.net', 'mailbox.org',
  'yandex.com', 'yandex.ru', 'mail.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'rambler.ru',
  'web.de', 't-online.de', 'libero.it', 'virgilio.it', 'tiscali.it', 'qq.com', '163.com', '126.com',
  // Fournisseurs d'accès et messageries françaises
  'orange.fr', 'wanadoo.fr', 'sfr.fr', 'neuf.fr', 'cegetel.net', 'club-internet.fr', 'noos.fr',
  'numericable.fr', 'numericable.com', '9online.fr', 'aliceadsl.fr', 'alice.fr', 'libertysurf.fr', 'tele2.fr',
  'free.fr', 'freesbee.fr', 'online.fr', 'bbox.fr', 'laposte.net', 'voila.fr', 'nordnet.fr', 'infonie.fr',
  'worldonline.fr', 'caramail.com', 'caramail.fr', 'netcourrier.com', 'tiscali.fr', 'club.fr', 'aol.fr',
  // Belgique, Suisse, Luxembourg
  'skynet.be', 'telenet.be', 'proximus.be', 'voo.be', 'scarlet.be',
  'bluewin.ch', 'hispeed.ch', 'sunrise.ch', 'gmx.ch', 'pt.lu',
  // Adresses jetables
  'yopmail.com', 'yopmail.fr', 'yopmail.net', 'mailinator.com', 'guerrillamail.com', 'guerrillamail.info',
  'guerrillamail.net', 'guerrillamail.org', 'sharklasers.com', 'grr.la', '10minutemail.com', 'temp-mail.org',
  'tempmail.com', 'throwawaymail.com', 'trashmail.com', 'trashmail.fr', 'jetable.org', 'mailnesia.com',
  'maildrop.cc', 'getnada.com', 'dispostable.com', 'mohmal.com', 'emailondeck.com', 'mytemp.email',
  'spambox.us', 'mailcatch.com', 'fakeinbox.com', 'tempr.email', 'discard.email', 'mintemail.com',
  'mailpoof.com', 'burnermail.io', 'jourrapide.com', 'speed.1s.fr', 'armyspy.com', 'cuvox.de', 'dayrep.com',
  'einrot.com', 'fleckens.hu', 'gustr.com', 'rhyta.com', 'superrito.com', 'teleworm.us', 'mvrht.net',
  'inboxkitten.com', 'tempail.com', 'emailfake.com', 'crazymailing.com', 'mailtemp.net',
  // Domaines réservés aux exemples
  'example.com', 'example.fr', 'example.org', 'example.net', 'test.com', 'test.fr',
]);

/**
 * Marques de messagerie grand public, quelle que soit l'extension (gmail.fr, yahoo.ca…).
 * Volontairement absentes : orange, sfr, free, laposte, live… dont les domaines d'entreprise
 * (orange.com, laposte.fr, sfr.com) servent aux salariés de ces groupes.
 */
const PERSONAL_BRANDS =
  /^(gmail|googlemail|hotmail|outlook|yahoo|ymail|rocketmail|icloud|gmx|yandex|protonmail|tutanota|zohomail|wanadoo|caramail|yopmail|mailinator|guerrillamail|trashmail)\.[a-z]{2,3}(\.[a-z]{2})?$/;

/** Fragments typiques des services d'adresses jetables. */
const DISPOSABLE_HINTS =
  /(temp-?mail|tmp-?mail|trash-?mail|throw-?away|10-?minute|minute-?mail|yopmail|jetable|fakeinbox|fake-?mail|mailinator|guerrillamail|disposable|spambox|spam4|burner-?mail|maildrop|getnada|nospam|mailnull|dropmail|tempinbox)/;

/** Extensions des alias jetables de Yopmail (cool.fr.nf, courriel.fr.nf…) et domaines techniques. */
const SUSPICIOUS_SUFFIXES = ['.fr.nf', '.1s.fr', '.invalid', '.test', '.example', '.localhost', '.local'];

export type EmailCheck = { ok: true } | { ok: false; reason: 'invalid' | 'personal' };

/** Domaine de l'adresse, en minuscules (chaîne vide si l'adresse est mal formée). */
export function emailDomain(email: unknown): string {
  const s = String(email ?? '').trim().toLowerCase();
  const at = s.lastIndexOf('@');
  if (at < 1 || at === s.length - 1) return '';
  return s.slice(at + 1).replace(/\.+$/, '');
}

/**
 * Adresse professionnelle ? Refuse les adresses mal formées, les messageries grand public,
 * les fournisseurs d'accès, les adresses jetables et les domaines qui n'en ont pas l'air
 * (adresse IP, domaine sans extension, domaines réservés aux tests).
 */
export function checkProEmail(email: unknown): EmailCheck {
  const s = String(email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return { ok: false, reason: 'invalid' };
  const domain = emailDomain(s);
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return { ok: false, reason: 'invalid' };
  if (/^\d+(\.\d+){3}$/.test(domain)) return { ok: false, reason: 'invalid' };

  for (let d = domain; d.includes('.'); d = d.slice(d.indexOf('.') + 1)) {
    if (PERSONAL_EMAIL_DOMAINS.has(d)) return { ok: false, reason: 'personal' };
  }
  if (PERSONAL_BRANDS.test(domain)) return { ok: false, reason: 'personal' };
  if (DISPOSABLE_HINTS.test(domain)) return { ok: false, reason: 'personal' };
  if (SUSPICIOUS_SUFFIXES.some((suf) => domain.endsWith(suf))) return { ok: false, reason: 'personal' };
  return { ok: true };
}

export const isProEmail = (email: unknown) => checkProEmail(email).ok;

/** Message affiché au visiteur. */
export const PRO_EMAIL_MESSAGE = 'Merci d’indiquer votre adresse e-mail professionnelle (les messageries personnelles et les adresses jetables ne sont pas acceptées).';
export const PRO_EMAIL_MESSAGE_EN = 'Please use your work email address (personal and disposable email addresses are not accepted).';
