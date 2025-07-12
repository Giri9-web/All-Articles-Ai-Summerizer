import React, { useState } from 'react';
import { FileCheck, Copy, CheckCircle, TrendingDown } from 'lucide-react';
import { SummaryResult } from '../types';

interface SummaryOutputProps {
  result: SummaryResult;
}

export function SummaryOutput({ result }: SummaryOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result.summary) {
      await navigator.clipboard.writeText(result.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const compressionPercentage = Math.round((1 - result.compressionRatio) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <FileCheck className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Summary</h2>
        </div>
        
        {result.summary && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="min-h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        {result.summary ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {result.summary}
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Your summary will appear here...
          </p>
        )}
      </div>
      
      {result.summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{result.summaryStats.words}</div>
            <div className="text-xs text-gray-600">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{result.summaryStats.sentences}</div>
            <div className="text-xs text-gray-600">Sentences</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
              <TrendingDown className="w-5 h-5" />
              {compressionPercentage}%
            </div>
            <div className="text-xs text-gray-600">Reduced</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(result.compressionRatio * 100)}%
            </div>
            <div className="text-xs text-gray-600">Retained</div>
          </div>
        </div>
      )}
    </div>
  );
}