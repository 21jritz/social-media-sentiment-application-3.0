import { franc } from 'franc';

interface LanguageDetectionResult {
  language: string;
  confidence: number;
}

export const detectLanguage = (text: string): LanguageDetectionResult => {
  const [languageCode, confidence] = franc(text, { minLength: 3 });
  
  return {
    language: languageCode,
    confidence: confidence || 0
  };
};