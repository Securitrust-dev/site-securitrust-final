// Rendu du « guide complet » des pages piliers (gabarit de docs/seo/cartographie-mots-cles.md).
//
// Une seule source par pilier (src/site-chrome/pillars/*.mjs) et un seul rendu HTML :
//  - landing pages statiques public/*.html : injecté par `npm run chrome:sync`
//    entre les marqueurs <!-- site-chrome:pillar --> (avec le JSON-LD FAQPage) ;
//  - pages React : <PillarGuide slug="…" /> (src/components/PillarGuide.tsx).
// Styles : public/site-chrome.css, préfixe #pl#pl (résiste au reset global de l'app).

import { faqNode, renderJsonLdScript, absoluteUrl } from './schema.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripTags = (html) => html.replace(/<[^>]+>/g, ' ');

export function wordCount(pillar) {
  const text = [pillar.intro, ...pillar.sections.map((s) => s.html), ...pillar.faq.map((f) => f.answer)].join(' ');
  return stripTags(text).split(/\s+/).filter(Boolean).length;
}

const frDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });

function renderResource(res, pillar) {
  if (!res) return '';
  return `<aside class="pl-res" id="ressource" aria-labelledby="pl-res-title">`
    + `<div class="pl-res-text"><p class="pl-kicker">Ressource gratuite · PDF</p>`
    + `<h2 id="pl-res-title">${esc(res.title)}</h2><p>${esc(res.description)}</p>`
    + `<ul>${res.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`
    + `<form class="pl-res-form" data-lead-form="lead_magnet" data-lead-static data-service="${esc(pillar.service)}"`
    + ` data-subject="Téléchargement — ${esc(res.title)}" data-source="${esc(pillar.name)} — ressource ${esc(res.title)}"`
    + ` data-message="A téléchargé : ${esc(res.title)} (${esc(pillar.path)})" data-download="${esc(res.file)}">`
    + `<label for="pl-res-name">Nom</label><input id="pl-res-name" name="name" autocomplete="name" required type="text" placeholder="Votre nom et prénom" />`
    + `<label for="pl-res-email">Email professionnel</label><input id="pl-res-email" name="email" autocomplete="email" required type="email" placeholder="prenom@entreprise.fr" />`
    + `<label for="pl-res-company">Entreprise</label><input id="pl-res-company" name="company" autocomplete="organization" type="text" placeholder="Nom de votre organisation" />`
    + '<div class="lead-hp" aria-hidden="true"><label>Site web <input name="website" tabindex="-1" autocomplete="off" /></label></div>'
    + `<button type="submit" class="pl-btn">Recevoir le PDF →</button>`
    + '<p class="lead-status" role="status" aria-live="polite" hidden></p>'
    + '<p class="pl-res-foot">Vos coordonnées ne servent qu’à vous recontacter au sujet de votre demande. '
    + '<a href="/politique-de-confidentialite">Confidentialité</a></p>'
    + '</form></aside>';
}

// Liens vers un article du blog dans le corps d'une section : <a data-article="slug">…</a>.
// Lien réel si l'article est publié (présent dans `articles`), simple texte sinon (brouillon) :
// le guide ne pointe jamais vers une page 404.
function linkArticles(html, articles) {
  return html.replace(/<a data-article="([^"]+)">([\s\S]*?)<\/a>/g, (_, slug, label) => {
    const a = articles.find((x) => x.slug === slug);
    return a ? `<a href="${esc(a.url)}">${label}</a>` : label;
  });
}

function renderByline(pillar) {
  const a = pillar.author;
  if (!a) return 'Équipe SecuriTrust';
  return `Par <a href="${esc(a.url)}" rel="author">${esc(a.name)}</a>, ${esc(a.role)}`;
}

/**
 * @param {object} pillar  données d'un pilier (src/site-chrome/pillars/*.mjs)
 * @param {{ articles?: { title: string, url: string, excerpt?: string }[] }} [opts]
 *   articles du blog liés (déjà filtrés : publiés et visibles).
 */
export function renderPillar(pillar, { articles = [] } = {}) {
  const minutes = Math.max(3, Math.round(wordCount(pillar) / 220));
  const tocItems = [
    ...pillar.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: 'faq', title: 'Questions fréquentes' },
    ...(pillar.resource ? [{ id: 'ressource', title: pillar.resource.title }] : []),
    { id: 'aller-plus-loin', title: 'Pour aller plus loin' },
  ];

  const sections = pillar.sections
    .map((s) => `<section class="pl-sec" id="${s.id}"><h2>${esc(s.title)}</h2>${linkArticles(s.html, articles)}</section>`)
    .join('');

  const faq = `<section class="pl-sec" id="faq"><h2>Questions fréquentes</h2>`
    + pillar.faq
      .map((f) => `<details class="pl-faq"><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`)
      .join('')
    + '</section>';

  const related = `<section class="pl-sec" id="aller-plus-loin"><h2>Pour aller plus loin</h2><div class="pl-cards">`
    + pillar.related
      .map((r) => `<a class="pl-card" href="${esc(r.href)}"><strong>${esc(r.label)}</strong><span>${esc(r.description)}</span></a>`)
      .join('')
    + '</div>'
    + (articles.length
      ? `<p class="pl-subtitle">Articles du blog</p><ul class="pl-articles">${articles
        .map((a) => `<li><a href="${esc(a.url)}">${esc(a.title)}</a></li>`)
        .join('')}</ul>`
      : '')
    + '</section>';

  return `<section id="pl" class="pl" aria-labelledby="pl-title"><div class="pl-wrap">`
    + `<div class="pl-head"><p class="pl-kicker">Guide complet</p>`
    + `<p class="pl-title" id="pl-title">${esc(pillar.guideTitle)}</p>`
    + `<p class="pl-meta">${renderByline(pillar)} · Mis à jour le <time datetime="${pillar.updated}">${frDate(pillar.updated)}</time> · ${minutes} min de lecture</p>`
    + `<p class="pl-intro">${pillar.intro}</p></div>`
    + `<div class="pl-grid"><nav class="pl-toc" aria-label="Sommaire du guide"><p>Sommaire</p><ol>${tocItems
      .map((t) => `<li><a href="#${t.id}">${esc(t.title)}</a></li>`)
      .join('')}</ol></nav>`
    + `<div class="pl-body">${sections}${faq}${renderResource(pillar.resource, pillar)}${related}</div>`
    + '</div></div></section>';
}

/** JSON-LD de la FAQ visible (mêmes questions, mêmes réponses). */
export function pillarSchemaNodes(pillar) {
  return [{ ...faqNode(pillar.faq), '@id': `${absoluteUrl(pillar.path)}#faq` }];
}

export const renderPillarSchema = (pillar) => renderJsonLdScript(pillarSchemaNodes(pillar));
