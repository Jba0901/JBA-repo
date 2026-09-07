'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './i18n';
import { DEFAULT_LANG, LANG_COOKIE, isLanguage } from './language.mjs';

const LangContext = createContext({ lang: DEFAULT_LANG, t: (k) => k, setLang: () => {}, dir: 'rtl' });

export function LangProvider({ children, initialLang = DEFAULT_LANG }) {
  // The first client render must match the language already rendered by the server.
  const [lang, updateLang] = useState(initialLang);

  const setLang = (nextLang) => {
    if (!isLanguage(nextLang)) return;
    updateLang(nextLang);
    // Keep campaign parameters and anchors while making reload/share explicit.
    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLang);
    window.history.replaceState(window.history.state, '', url);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // UI preference only, not advertising consent or a tracking identifier.
    document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    try {
      localStorage.setItem(LANG_COOKIE, lang);
      localStorage.removeItem('lang');
    } catch {}
  }, [lang]);

  useEffect(() => {
    const syncExplicitLanguage = () => {
      const value = new URLSearchParams(window.location.search).get('lang');
      if (isLanguage(value)) updateLang(value);
    };
    window.addEventListener('popstate', syncExplicitLanguage);
    return () => window.removeEventListener('popstate', syncExplicitLanguage);
  }, []);

  const t = (key) => (translations[lang] && translations[lang][key]) || key;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
