import React from 'react';
import { FileText, Hash, Clock, Globe } from 'lucide-react';
import { TextStats } from '../../types';
import { indianLanguages } from '../../data/languages';

interface TextInputProps {
  text: string;
  onChange: (text: string) => void;
  stats: TextStats;
  language?: string;
  placeholder?: string;
}

export function TextInput({ text, onChange, stats, language, placeholder }: TextInputProps) {
  const selectedLanguage = indianLanguages.find(lang => lang.code === language);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Input Text</h2>
        </div>
        {selectedLanguage && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>{selectedLanguage.name}</span>
          </div>
        )}
      </div>
      
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Paste your text here to generate a summary..."}
        className="w-full h-80 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
        style={{ 
          fontFamily: language === 'hi' ? 'system-ui, -apple-system, sans-serif' : 'system-ui, -apple-system, sans-serif',
          direction: ['ur', 'ar'].includes(language || '') ? 'rtl' : 'ltr'
        }}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold text-gray-700">
            <Hash className="w-4 h-4" />
            {stats.characters}
          </div>
          <div className="text-xs text-gray-600">Characters</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{stats.words}</div>
          <div className="text-xs text-gray-600">Words</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{stats.sentences}</div>
          <div className="text-xs text-gray-600">Sentences</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-600">
            <Clock className="w-4 h-4" />
            {stats.readingTime}m
          </div>
          <div className="text-xs text-gray-600">Read Time</div>
        </div>
      </div>

      {stats.words > 0 && stats.words < 10 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> For better summary quality, please enter at least 10 words. 
            Current count: {stats.words} words.
          </p>
        </div>
      )}
    </div>
  );
}