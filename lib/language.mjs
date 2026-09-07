export const DEFAULT_LANG = 'ar';
export const LANG_COOKIE = 'mlPreferredLang';
export const LANG_HEADER = 'x-mimaarlink-language';
export const isLanguage = (value) => value === 'ar' || value === 'en';

// An explicit shared link takes precedence over a remembered UI preference.
export function resolveLanguage(query, cookie) {
  return isLanguage(query) ? query : isLanguage(cookie) ? cookie : DEFAULT_LANG;
}
