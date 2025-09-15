"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Languages, Loader2 } from 'lucide-react';
import { translateText, LANGUAGE_CODES } from '@/lib/translate';
import { useI18n } from '@/hooks/use-i18n';
import { useToast } from '@/hooks/use-toast';
import type { Language } from '@/lib/types';

interface TranslateButtonProps {
  text: string;
  onTranslate: (translatedText: string) => void;
  className?: string;
}

export function TranslateButton({ text, onTranslate, className }: TranslateButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const { language } = useI18n();
  const { toast } = useToast();

  const handleTranslate = async (targetLang: Language) => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "No text to translate",
        description: "Please enter some text first.",
      });
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateText(
        text, 
        LANGUAGE_CODES[targetLang]
      );
      
      onTranslate(result.translatedText);
      toast({
        title: "Translation successful",
        description: `Text translated to ${targetLang === 'en' ? 'English' : targetLang === 'de' ? 'German' : 'Chinese'}`,
      });
    } catch (error) {
      console.error('Translation failed:', error);
      toast({
        variant: "destructive",
        title: "Translation failed",
        description: "Could not translate text. Please try again.",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'de' as Language, name: 'Deutsch' },
    { code: 'zh' as Language, name: '中文' },
  ].filter(lang => lang.code !== language); // Don't show current language

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={className}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Languages className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableLanguages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => handleTranslate(lang.code)}
            disabled={isTranslating}
          >
            Translate to {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}