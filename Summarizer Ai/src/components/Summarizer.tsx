import React, { useState, useMemo } from 'react';
import { Sparkles, Zap, Target, Settings } from 'lucide-react';
import { TextInput } from './TextInput';
import { SummaryOutput } from './SummaryOutput';
import { summarizer } from '../utils/summarizer';
import { SummaryOptions } from '../types';

export function Summarizer() {
  const [text, setText] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryOptions['length']>('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  const textStats = useMemo(() => summarizer.getTextStats(text), [text]);

  const summaryResult = useMemo(() => {
    if (!text.trim()) {
      return {
        summary: '',
        originalStats: { characters: 0, words: 0, sentences: 0 },
        summaryStats: { characters: 0, words: 0, sentences: 0 },
        compressionRatio: 0
      };
    }
    return summarizer.summarize(text, { length: summaryLength });
  }, [text, summaryLength]);

  const handleSummarize = () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    // Add a small delay for better UX
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const lengthOptions = [
    { value: 'short' as const, label: 'Short', icon: Target, description: '~30% of original' },
    { value: 'medium' as const, label: 'Medium', icon: Zap, description: '~50% of original' },
    { value: 'long' as const, label: 'Long', icon: Settings, description: '~70% of original' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Summary Length Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Summary Length</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSummaryLength(option.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                summaryLength === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm opacity-75">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <TextInput 
            text={text}
            onChange={setText}
            stats={textStats}
            placeholder="Enter your text here. The summarizer works best with longer texts like articles, essays, or documents. Try pasting a news article or research paper to see how it extracts the key points!"
          />
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <SummaryOutput result={summaryResult} />
        </div>
      </div>

      {/* Action Button */}
      {text.trim() && (
        <div className="flex justify-center">
          <button
            onClick={handleSummarize}
            disabled={isProcessing || !text.trim()}
            className={`px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 transform ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Summary
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}