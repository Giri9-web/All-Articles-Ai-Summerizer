/**
 * Python API Client for Advanced Multilingual Summarizer
 * Connects React frontend with Python backend
 */

import { SummaryResult, TextStats, SummaryOptions } from '../types';

export interface PythonApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

export interface LanguageDetectionResult {
  detected_language: string;
  language_name: string;
  script: string;
  confidence: number;
  alternatives?: Array<{
    language: string;
    confidence: number;
  }>;
}

export interface KeywordExtractionResult {
  keywords: string[];
  language: string;
  count: number;
  scores?: number[];
}

export interface BatchSummaryResult {
  results: SummaryResult[];
  total_processed: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

class PythonApiClient {
  private config: PythonApiConfig;

  constructor(config: Partial<PythonApiConfig> = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'http://localhost:5000',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}/api${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    let lastError: Error;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          ...defaultOptions,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === this.config.retries) {
          break;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    throw new Error(`API request failed after ${this.config.retries} attempts: ${lastError.message}`);
  }

  /**
   * Check API health and get system status
   */
  async healthCheck(): Promise<{
    status: string;
    message: string;
    timestamp: string;
    supported_languages: string[];
  }> {
    return this.makeRequest('/health');
  }

  /**
   * Get list of supported languages
   */
  async getSupportedLanguages(): Promise<{
    languages: Array<{
      code: string;
      name: string;
      script: string;
    }>;
  }> {
    return this.makeRequest('/languages');
  }

  /**
   * Detect language of input text
   */
  async detectLanguage(text: string): Promise<LanguageDetectionResult> {
    return this.makeRequest('/detect-language', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  /**
   * Get detailed text statistics
   */
  async getTextStats(text: string): Promise<{
    stats: TextStats;
    language: string;
    keywords: string[];
  }> {
    return this.makeRequest('/text-stats', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  /**
   * Generate text summary using Python backend
   */
  async summarizeText(text: string, options: Partial<SummaryOptions> = {}): Promise<SummaryResult> {
    const requestOptions = {
      length: options.length || 'medium',
      language: options.language,
      preserve_formatting: options.preserveFormatting || false,
      include_keywords: options.includeKeywords !== false,
      max_keywords: 10,
    };

    const result = await this.makeRequest<SummaryResult>('/summarize', {
      method: 'POST',
      body: JSON.stringify({
        text,
        options: requestOptions,
      }),
    });

    // Convert Python response to frontend format
    return {
      ...result,
      createdAt: new Date(result.createdAt),
      originalStats: {
        ...result.originalStats,
        paragraphs: result.originalStats.paragraphs || 1,
        readingTime: result.originalStats.readingTime || 1,
      },
      summaryStats: {
        ...result.summaryStats,
        paragraphs: result.summaryStats.paragraphs || 1,
        readingTime: result.summaryStats.readingTime || 1,
      },
    };
  }

  /**
   * Extract keywords from text
   */
  async extractKeywords(
    text: string,
    language?: string,
    numKeywords: number = 10
  ): Promise<KeywordExtractionResult> {
    return this.makeRequest('/keywords', {
      method: 'POST',
      body: JSON.stringify({
        text,
        language,
        num_keywords: numKeywords,
      }),
    });
  }

  /**
   * Batch summarization for multiple texts
   */
  async batchSummarize(
    texts: string[],
    options: Partial<SummaryOptions> = {}
  ): Promise<BatchSummaryResult> {
    const requestOptions = {
      length: options.length || 'medium',
      language: options.language,
      preserve_formatting: options.preserveFormatting || false,
      include_keywords: options.includeKeywords !== false,
    };

    return this.makeRequest('/batch-summarize', {
      method: 'POST',
      body: JSON.stringify({
        texts,
        options: requestOptions,
      }),
    });
  }

  /**
   * Test API connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.healthCheck();
      return response.status === 'healthy';
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  /**
   * Get API performance metrics
   */
  async getPerformanceMetrics(text: string): Promise<{
    estimated_processing_time: number;
    text_complexity: string;
    recommended_length: string;
  }> {
    const stats = await this.getTextStats(text);
    const wordCount = stats.stats.words;
    
    // Estimate processing time (rough calculation)
    const estimatedTime = Math.max(0.5, wordCount / 1000);
    
    // Determine text complexity
    let complexity = 'simple';
    if (wordCount > 500) complexity = 'moderate';
    if (wordCount > 1500) complexity = 'complex';
    
    // Recommend summary length based on text size
    let recommendedLength = 'medium';
    if (wordCount < 200) recommendedLength = 'long';
    if (wordCount > 1000) recommendedLength = 'short';
    
    return {
      estimated_processing_time: estimatedTime,
      text_complexity: complexity,
      recommended_length: recommendedLength,
    };
  }
}

// Create singleton instance
export const pythonApiClient = new PythonApiClient();

// Export utility functions
export const usePythonApi = () => {
  return {
    healthCheck: () => pythonApiClient.healthCheck(),
    detectLanguage: (text: string) => pythonApiClient.detectLanguage(text),
    getTextStats: (text: string) => pythonApiClient.getTextStats(text),
    summarizeText: (text: string, options?: Partial<SummaryOptions>) => 
      pythonApiClient.summarizeText(text, options),
    extractKeywords: (text: string, language?: string, numKeywords?: number) =>
      pythonApiClient.extractKeywords(text, language, numKeywords),
    batchSummarize: (texts: string[], options?: Partial<SummaryOptions>) =>
      pythonApiClient.batchSummarize(texts, options),
    testConnection: () => pythonApiClient.testConnection(),
    getPerformanceMetrics: (text: string) => pythonApiClient.getPerformanceMetrics(text),
  };
};

// Configuration helper
export const configurePythonApi = (config: Partial<PythonApiConfig>) => {
  return new PythonApiClient(config);
};

export default pythonApiClient;