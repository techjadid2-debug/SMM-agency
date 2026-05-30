import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../translations';

type Theme = 'dark' | 'light';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: keyof typeof translations['uz'], replacements?: Record<string, string>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('smm_language');
    if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    return 'uz';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('smm_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // default theme is professional dark
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('smm_language', lang);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    localStorage.setItem('smm_theme', nextTheme);
  };

  // Synchronize CSS class with HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    // Apply background design base properties
    if (theme === 'light') {
      root.style.backgroundColor = '#f8fafc'; // slate 50
    } else {
      root.style.backgroundColor = '#020617'; // slate 950
    }
  }, [theme]);

  // Translate helper function supporting micro placeholders e.g. {brand} -> SMM PRO
  const t = (key: keyof typeof translations['uz'], replacements?: Record<string, string>): string => {
    const dictionary = translations[language] || translations['uz'];
    let val = dictionary[key] || translations['uz'][key] || '';
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, v);
      });
    }
    return val;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
