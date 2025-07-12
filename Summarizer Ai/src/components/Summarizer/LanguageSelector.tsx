import React from 'react';
import { Globe } from 'lucide-react';
import { indianLanguages } from '../../data/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <Globe className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Select Language</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {indianLanguages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedLanguage === language.code
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold text-sm">{language.name}</div>
            <div className="text-xs opacity-75">{language.nativeName}</div>
            <div className="text-xs opacity-50 mt-1">{language.script}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Auto-detection:</strong> Our AI can automatically detect the language of your text. 
          Manual selection ensures better accuracy for mixed-language content.
        </p>
      </div>
    </div>
  );
}