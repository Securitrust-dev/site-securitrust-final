import sanitizeHtml from 'sanitize-html';

/** Shared sanitize options for RSS articles */
export const RSS_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class'],
    'a': ['href', 'target', 'rel', 'title'],
    'img': ['src', 'alt', 'width', 'height', 'loading'],
    'td': ['colspan', 'rowspan'],
    'th': ['colspan', 'rowspan', 'scope'],
  },
  allowedSchemes: ['https', 'http', 'mailto'],
  allowedSchemesByTag: { img: ['https', 'data'] },
};

/** RSS feed URL */
export const RSS_FEED_URL = 'https://feeds.feedburner.com/TheHackersNews';

/** Generate URL-friendly slug from any text */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract image URL from RSS item */
export function extractImage(item: any): string {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }
  return 'https://thehackernews.com/images/default-article.jpg';
}

/** French stop words for keyword matching */
export const RSS_STOP_WORDS = new Set([
  'une', 'de', 'des', 'du', 'la', 'le', 'les', 'pour', 'que', 'est',
  'pas', 'par', 'sur', 'dans', 'avec', 'au', 'aux', 'en', 'se', 'ce',
  'et', 'ou', 'qui', 'dont', 'sont', 'fait', 'plus', 'apres', 'vers',
  'faille', 'dans', 'tous', 'tout', 'entre', 'sans', 'chez', 'avant',
  'pendant', 'depuis', 'jusque', 'mais', 'donc', 'ni', 'car', 'or',
]);