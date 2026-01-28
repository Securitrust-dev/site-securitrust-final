
/**
 * Utility to translate text from English to French.
 * Uses a free translation API with fallbacks.
 */
export async function translateToFrench(text: string): Promise<string> {
  if (!text || text.trim() === '') return '';

  try {
    // We'll use the Google Translate free API (unofficial but reliable for small tasks)
    // Format: https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=TEXT
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation failed');
    
    const data = await response.json();
    
    // Google Translate returns an array of arrays
    // data[0] contains the translated segments
    if (data && data[0]) {
      return data[0].map((segment: any) => segment[0]).join('');
    }
    
    return text; // Fallback to original
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original on error
  }
}

/**
 * Generates a SEO-friendly slug from a French title.
 */
export function generateFrenchSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens
    .replace(/^-|-$/g, ''); // Trim hyphens from start and end
}
