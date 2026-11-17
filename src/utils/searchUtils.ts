/**
 * Advanced Arabic text normalization and fuzzy search utility
 * Handles:
 * - Teh Marbuta (ة) vs Heh (ه)
 * - Alef forms (أ, إ, آ, ٱ, ا)
 * - Yeh (ي, ى, ئ)
 * - Waw with Hamza (ؤ) vs Waw (و)
 * - Tashkeel (diacritics: ً ٌ ٍ َ ُ ِ ّ ْ)
 * - Tatweel (ـ)
 * - Typo tolerance via Damerau-Levenshtein distance (handles transpositions, insertions, deletions, substitutions)
 */

export function normalizeArabic(text: string): string {
  if (!text) return '';

  return (
    text
      .toLowerCase()
      // Remove Arabic Tashkeel / Diacritics
      .replace(/[\u064B-\u065F\u0670]/g, '')
      // Remove Tatweel (Kashida)
      .replace(/\u0640/g, '')
      // Normalize Alef variants to bare Alef
      .replace(/[أإآٱ]/g, 'ا')
      // Normalize Teh Marbuta to Heh (and treat interchangeably)
      .replace(/ة/g, 'ه')
      // Normalize Alef Maksura to Yeh
      .replace(/ى/g, 'ي')
      // Normalize Hamza carriers
      .replace(/[ؤ]/g, 'و')
      .replace(/[ئ]/g, 'ي')
      .replace(/ء/g, '')
      // Collapse repeated characters (e.g. طعمييية -> طعمية)
      .replace(/(.)\1{2,}/g, '$1$1')
      // Clean up whitespace & punctuation
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Calculates Damerau-Levenshtein distance between two strings
 * (Includes transposition of adjacent characters, which is the most common typo)
 */
function damerauLevenshtein(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const d: number[][] = [];
  for (let i = 0; i <= an; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (let j = 0; j <= bn; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,       // deletion
        d[i][j - 1] + 1,       // insertion
        d[i - 1][j - 1] + cost // substitution
      );

      // Transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }

  return d[an][bn];
}

/**
 * Checks if query word fuzzy-matches a target word
 */
function isWordFuzzyMatch(queryWord: string, targetWord: string): boolean {
  if (targetWord.includes(queryWord) || queryWord.includes(targetWord)) return true;

  // Short words (1-2 chars) must match exactly
  if (queryWord.length < 3) return false;

  const maxDist = queryWord.length >= 4 ? 2 : 1;
  const dist = damerauLevenshtein(queryWord, targetWord);
  if (dist <= maxDist) return true;

  // Prefix check for partial typing
  if (targetWord.length >= queryWord.length && queryWord.length >= 3) {
    const subTarget = targetWord.substring(0, queryWord.length);
    if (damerauLevenshtein(queryWord, subTarget) <= 1) return true;
  }

  return false;
}

/**
 * Comprehensive fuzzy match for items
 */
export function matchItemWithFuzzy(
  query: string,
  item: {
    name: string;
    nameEn?: string;
    description?: string;
    category?: string;
  }
): boolean {
  const rawQuery = query.trim();
  if (!rawQuery) return true;

  const normQuery = normalizeArabic(rawQuery);
  const normName = normalizeArabic(item.name);
  const normDesc = normalizeArabic(item.description || '');
  const normCat = normalizeArabic(item.category || '');
  const rawEn = (item.nameEn || '').toLowerCase();
  const rawQueryLower = rawQuery.toLowerCase();

  // 1. Direct fast inclusion check
  if (
    normName.includes(normQuery) ||
    normDesc.includes(normQuery) ||
    normCat.includes(normQuery) ||
    rawEn.includes(rawQueryLower)
  ) {
    return true;
  }

  // 2. Token-based matching: each word in the query must match at least one word in target
  const queryTokens = normQuery.split(' ').filter((t) => t.length > 0);
  const targetTokens = `${normName} ${normDesc} ${normCat}`.split(' ').filter((t) => t.length > 0);

  const allTokensMatch = queryTokens.every((qToken) => {
    return targetTokens.some((tToken) => isWordFuzzyMatch(qToken, tToken));
  });

  return allTokensMatch;
}
