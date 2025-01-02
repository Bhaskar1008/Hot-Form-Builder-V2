
import React from 'react';
import { LanguageProps } from './types';
import { useTranslation } from './hooks/useTranslation';
import { LanguageSelector } from './components/LanguageSelector';
import { Globe } from 'lucide-react';

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }
];

const Language: React.FC<LanguageProps> = ({ component, onChange }) => {
  const { currentLanguage, setLanguage } = useTranslation(
    component.settings?.defaultLanguage || 'en'
  );

  const handleLanguageSelect = (code: string) => {
    const currentSelected = component.settings?.selectedLanguages || [];
    const newSelected = currentSelected.includes(code)
      ? currentSelected.filter(c => c !== code)
      : [...currentSelected, code];
    
    onChange?.(newSelected);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-600" />
        <label className="block text-sm font-medium text-gray-700">
          {component.label}
          {component.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      <LanguageSelector
        languages={availableLanguages}
        selectedLanguages={component.settings?.selectedLanguages || []}
        currentLanguage={currentLanguage}
        onLanguageSelect={handleLanguageSelect}
        onLanguageSwitch={setLanguage}
      />
    </div>
  );
};

export default Language;
