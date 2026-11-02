// Dimensions intrinsèques des logos clients (public/clients/white/*.png), en pixels.
// Posées en attributs width/height : le navigateur réserve la place avant le
// chargement (pas de décalage de mise en page, CLS). Le CSS garde la main sur la
// taille affichée (height fixée, width:auto). À mettre à jour si un logo change.
export const LOGO_DIMS: Record<string, [number, number]> = {
  'abeille-assurance': [290, 102],
  'aramisauto': [159, 102],
  'axa': [102, 102],
  'backupta': [505, 102],
  'bollore': [248, 102],
  'cegedim': [469, 102],
  'kallista-energy': [246, 102],
  'lyvoc': [208, 102],
  'malakoff': [166, 102],
  'munich-re': [441, 102],
  'natixis': [444, 102],
  'pizzorno': [434, 102],
  'thales': [339, 102],
};

/** Attributs width/height d'un logo à partir de son chemin ou de son nom de fichier. */
export function logoDims(srcOrFile: string): { width?: number; height?: number } {
  const key = srcOrFile.replace(/^.*\//, '').replace(/\.png$/, '');
  const d = LOGO_DIMS[key];
  return d ? { width: d[0], height: d[1] } : {};
}
