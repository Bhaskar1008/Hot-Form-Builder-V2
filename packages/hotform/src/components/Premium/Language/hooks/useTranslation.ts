
import { useState, useCallback } from 'react';
import { Translation } from '../types';

export const useTranslation = (initialLanguage: string = 'en') => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  const translate = useCallback((key: string, translations?: Translation) => {
    if (!translations) return key;
    return translations[key] || key;
  }, []);

  return {
    currentLanguage,
    setLanguage: setCurrentLanguage,
    translate
  };
};
