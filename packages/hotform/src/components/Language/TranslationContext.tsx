import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  translate: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setLanguage] = useState('en');

  const translate = (key: string) => {
    // Simple translation function - expand this based on your needs
    const translations: Record<string, Record<string, string>> = {
      en: {
        submit: 'Submit',
        reset: 'Reset'
      }
    };
    return translations[currentLanguage]?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};