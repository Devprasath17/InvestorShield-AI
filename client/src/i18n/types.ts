export type Language = 'en' | 'ta';

export type TranslationKey = string; // We'll type this strictly if time allows, but for now we'll use a dynamic getter

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}
