import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Settings, Brain, Wand2, Server, Wifi, WifiOff } from 'lucide-react';
import { TextInput } from './TextInput';
import { SummaryCard } from './SummaryCard';
import { LanguageSelector } from './LanguageSelector';
import { usePythonApi } from '../../utils/pythonApiClient';
import { useSummaryStore } from '../../store/summaryStore';
import { useAuthStore } from '../../store/authStore';
import { SummaryOptions } from '../../types';
import toast from 'react-hot-toast';

export function PythonSummarizer() {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [summaryLength, setSummaryLength] = useState<SummaryOptions['length']>('medium');
  const [preserveFormatting, setPreserveFormatting] = useState(false);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  
  const { addSummary, currentSummary } = useSummaryStore();
  const { user } = useAuthStore();
  const pythonApi = usePythonApi();

  // Check API connection on component mount
  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const isConnected = await pythonApi.testConnection();
      setApiConnected(isConnected);
      if (isConnected) {
        toast.success('Connected to Python AI backend');
      } else {
        toast.error('Python backend not available. Using fallback summarizer.');
      }
    } catch (error) {
      setApiConnected(false);
      toast.error('Failed to connect to Python backend');
    } finally {
      setIsCheckingConnection(false);
    }
  };

  // Get text statistics using Python API or fallback
  const textStats = useMemo(async () => {
    if (!text.trim()) {
      return { characters: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
    }

    if (apiConnected) {
      try {
        const result = await pythonApi.getTextStats(text);
        return result.stats;
      } catch (error) {
        console.error('Failed to get stats from Python API:', error);
      }
    }

    // Fallback calculation
    const words = text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    return {
      characters: text.length,
      words,
      sentences,
      paragraphs: Math.max(1, paragraphs),
      readingTime: Math.ceil(words / 200)
    };
  }, [text, apiConnected]);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }
    
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 10) {
      toast.error('Text is too short. Please enter at least 10 words.');
      return;
    }

    setIsProcessing(true);
    
    try {
      let result;
      
      if (apiConnected) {
        // Use Python backend
        toast.loading('Processing with Python AI...', { id: 'processing' });
        
        const options: Partial<SummaryOptions> = {
          length: summaryLength,
          language: selectedLanguage,
          preserveFormatting,
          includeKeywords,
        };
        
        result = await pythonApi.summarizeText(text, options);
        toast.success('Summary generated with Python AI!', { id: 'processing' });
      } else {
        // Fallback to JavaScript summarizer
        toast.loading('Processing with fallback summarizer...', { id: 'processing' });
        
        // Import and use the existing JavaScript summarizer
        const { multilingualSummarizer } = await import('../../utils/multilingualSummarizer');
        
        const options: SummaryOptions = {
          length: summaryLength,
          language: selectedLanguage,
          preserveFormatting,
          includeKeywords,
        };
        
        result = multilingualSummarizer.summarize(text, options);
        toast.success('Summary generated with fallback AI!', { id: 'processing' });
      }
      
      // Add user context if authenticated
      if (user) {
        result.userId = user.id;
      }
      
      addSummary(result);
    } catch (error) {
      console.error('Summarization error:', error);
      toast.error('Failed to generate summary. Please try again.', { id: 'processing' });
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
      {/* API Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-2xl border ${
          isCheckingConnection 
            ? 'bg-yellow-50 border-yellow-200' 
            : apiConnected 
              ? 'bg-green-50 border-green-200' 
              : 'bg-orange-50 border-orange-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCheckingConnection ? (
              <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            ) : apiConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-orange-600" />
            )}
            
            <div>
              <div className="font-semibold text-gray-900">
                {isCheckingConnection 
                  ? 'Checking Python Backend...' 
                  : apiConnected 
                    ? 'Python AI Backend Connected' 
                    : 'Using Fallback Summarizer'
                }
              </div>
              <div className="text-sm text-gray-600">
                {isCheckingConnection 
                  ? 'Testing connection to advanced AI backend'
                  : apiConnected 
                    ? 'Advanced multilingual AI processing available'
                    : 'Python backend unavailable. Using JavaScript fallback.'
                }
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Server className={`w-4 h-4 ${apiConnected ? 'text-green-600' : 'text-gray-400'}`} />
            <button
              onClick={checkApiConnection}
              disabled={isCheckingConnection}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              {isCheckingConnection ? 'Checking...' : 'Retry'}
            </button>
          </div>
        </div>
      </motion.div>

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
          {apiConnected && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Python AI
            </span>
          )}
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
            stats={await textStats}
            language={selectedLanguage}
            placeholder={`Enter your text here. ${apiConnected ? 'Our advanced Python AI' : 'Our JavaScript fallback'} supports all major Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, and many more. Try pasting a news article, research paper, or any document you'd like to summarize!`}
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
                  <span>
                    {apiConnected ? 'Python AI-powered' : 'JavaScript-powered'} multilingual summarization
                  </span>
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
            disabled={isProcessing || !text.trim() || (await textStats).words < 10}
            className={`px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 transform ${
              isProcessing || (await textStats).words < 10
                ? 'bg-gray-400 cursor-not-allowed'
                : apiConnected
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {apiConnected ? 'Processing with Python AI...' : 'Processing with Fallback AI...'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span>
                  Generate {apiConnected ? 'Python AI' : 'AI'} Summary
                </span>
              </div>
            )}
          </button>
        </motion.div>
      )}

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Minimum 10 words required • Supports 22+ Indian languages • 
          {(await textStats).words > 0 && (
            <span className={(await textStats).words >= 10 ? 'text-green-600' : 'text-red-600'}>
              {' '}Current: {(await textStats).words} words
            </span>
          )}
          {apiConnected && (
            <span className="text-green-600"> • Python AI Backend Active</span>
          )}
        </p>
      </div>
    </div>
  );
}