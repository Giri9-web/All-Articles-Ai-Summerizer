import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Settings, Brain, Wand2 } from 'lucide-react';
import { TextInput } from './TextInput';
import { SummaryCard } from './SummaryCard';
import { LanguageSelector } from './LanguageSelector';
import { multilingualSummarizer } from '../../utils/multilingualSummarizer';
import { useSummaryStore } from '../../store/summaryStore';
import { useAuthStore } from '../../store/authStore';
import { SummaryOptions } from '../../types';
import toast from 'react-hot-toast';

export function AdvancedSummarizer() {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [summaryLength, setSummaryLength] = useState<SummaryOptions['length']>('medium');
  const [preserveFormatting, setPreserveFormatting] = useState(false);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addSummary, currentSummary } = useSummaryStore();
  const { user } = useAuthStore();

  const textStats = useMemo(() => multilingualSummarizer.getTextStats(text), [text]);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }
    
    if (textStats.words < 10) {
      toast.error('Text is too short. Please enter at least 10 words.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Add a realistic delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const options: SummaryOptions = {
        length: summaryLength,
        language: selectedLanguage,
        preserveFormatting,
        includeKeywords,
      };
      
      const result = multilingualSummarizer.summarize(text, options);
      
      // Add user context if authenticated
      if (user) {
        result.userId = user.id;
      }
      
      addSummary(result);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const lengthOptions = [
    { value: 'short' as const, label: 'Short', icon: Target, description: '~25% of original', color: 'text-green-600' },
    { value: 'medium' as const, label: 'Medium', icon: Zap, description: '~40% of original', color: 'text-blue-600' },
    { value: 'long' as const, label: 'Long', icon: Settings, description: '~60% of original', color: 'text-purple-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Language Selection */}
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Summary Options */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Summary Options</h2>
        </div>
        
        {/* Length Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Summary Length</h3>
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
                  <option.icon className={`w-5 h-5 ${summaryLength === option.value ? 'text-blue-600' : option.color}`} />
                  <div className="text-left">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm opacity-75">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <input
              type="checkbox"
              checked={preserveFormatting}
              onChange={(e) => setPreserveFormatting(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-gray-900">Preserve Formatting</div>
              <div className="text-sm text-gray-600">Maintain original text structure</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <input
              type="checkbox"
              checked={includeKeywords}
              onChange={(e) => setIncludeKeywords(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-gray-900">Extract Keywords</div>
              <div className="text-sm text-gray-600">Identify key topics and terms</div>
            </div>
          </label>
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
            language={selectedLanguage}
            placeholder="Enter your text here. Our AI supports all major Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, and many more. Try pasting a news article, research paper, or any document you'd like to summarize!"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {currentSummary ? (
            <SummaryCard summary={currentSummary} />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Summarize</h3>
                <p className="text-gray-600 mb-6">
                  Enter your text and click the button below to generate an intelligent summary
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Wand2 className="w-4 h-4" />
                  <span>AI-powered multilingual summarization</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {text.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSummarize}
            disabled={isProcessing || !text.trim() || textStats.words < 10}
            className={`px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 transform ${
              isProcessing || textStats.words < 10
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing with AI...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Summary</span>
              </div>
            )}
          </button>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Minimum 10 words required • Supports 22+ Indian languages • 
          {textStats.words > 0 && (
            <span className={textStats.words >= 10 ? 'text-green-600' : 'text-red-600'}>
              {' '}Current: {textStats.words} words
            </span>
          )}
        </p>
      </div>
    </div>
  );
}