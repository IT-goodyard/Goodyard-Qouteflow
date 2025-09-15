// Google Translate utility functions
const GOOGLE_TRANSLATE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export interface TranslateResponse {
  translatedText: string;
  detectedSourceLanguage?: string;
}

export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage?: string
): Promise<TranslateResponse> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    throw new Error('Google Translate API key is not configured');
  }

  if (!text.trim()) {
    return { translatedText: text };
  }

  try {
    const params = new URLSearchParams({
      key: GOOGLE_TRANSLATE_API_KEY,
      q: text,
      target: targetLanguage,
      format: 'text',
    });

    if (sourceLanguage) {
      params.append('source', sourceLanguage);
    }

    const response = await fetch(`${TRANSLATE_API_URL}?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translation = data.data.translations[0];

    return {
      translatedText: translation.translatedText,
      detectedSourceLanguage: translation.detectedSourceLanguage,
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}

// Language code mapping for the app
export const LANGUAGE_CODES = {
  'en': 'en',
  'de': 'de', 
  'zh': 'zh-CN'
} as const;