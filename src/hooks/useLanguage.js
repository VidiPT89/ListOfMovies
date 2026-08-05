import { useState, useEffect } from 'react';

const LANGUAGE_KEY = 'appLanguage';

export const useLanguage = () => {
  const [language, setLanguage] = useState('pt-PT');

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Detectar idioma do navegador
      const browserLang = navigator.language || 'en-US';
      const initialLang = browserLang.includes('pt') ? 'pt-PT' : 'en-US';
      setLanguage(initialLang);
      localStorage.setItem(LANGUAGE_KEY, initialLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'pt-PT' ? 'en-US' : 'pt-PT';
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return { language, toggleLanguage };
};
