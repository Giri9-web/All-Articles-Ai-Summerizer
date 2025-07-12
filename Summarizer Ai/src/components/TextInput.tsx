import React from 'react';
import { FileText, Hash } from 'lucide-react';
import { TextStats } from '../types';

interface TextInputProps {
  text: string;
  onChange: (text: string) => void;
  stats: TextStats;
  placeholder?: string;
}

export function TextInput({ text, onChange, stats, placeholder }: TextInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <FileText className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Input Text</h2>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Paste your text here to generate a summary..."}
        className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      />
      
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Hash className="w-4 h-4" />
          <span>{stats.characters} characters</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">W</span>
          <span>{stats.words} words</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">S</span>
          <span>{stats.sentences} sentences</span>
        </div>
      </div>
    </div>
  );
}