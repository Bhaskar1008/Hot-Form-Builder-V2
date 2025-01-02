
export interface Translation {
  [key: string]: string;
}

export interface Language {
  code: string;
  name: string;
  translations: Translation;
}

export interface LanguageProps {
  component: {
    id: string;
    type: string;
    label: string;
    settings?: {
      defaultLanguage?: string;
      selectedLanguages?: string[];
      showSelector?: boolean;
      autoDetect?: boolean;
    };
  };
  onChange?: (value: string[]) => void;
}
