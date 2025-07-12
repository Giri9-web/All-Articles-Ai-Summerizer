import { SummaryOptions, TextStats, SummaryResult } from '../types';
import { indianLanguages } from '../data/languages';

export class MultilingualSummarizer {
  private stopWords: { [key: string]: Set<string> } = {
    'hi': new Set(['और', 'का', 'के', 'की', 'को', 'में', 'से', 'पर', 'है', 'हैं', 'था', 'थे', 'यह', 'वह', 'इस', 'उस', 'एक', 'दो', 'तीन']),
    'en': new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with']),
    'bn': new Set(['এবং', 'বা', 'কিন্তু', 'যে', 'যা', 'এই', 'সেই', 'একটি', 'একটা', 'হয়', 'হয়েছে', 'করা', 'করে', 'থেকে', 'সাথে']),
    'te': new Set(['మరియు', 'లేదా', 'కానీ', 'అని', 'ఇది', 'అది', 'ఒక', 'రెండు', 'మూడు', 'నాలుగు', 'అయిన', 'అయినది', 'చేసిన', 'చేసింది']),
    'ta': new Set(['மற்றும்', 'அல்லது', 'ஆனால்', 'என்று', 'இது', 'அது', 'ஒரு', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஆகும்', 'செய்த', 'செய்யும்']),
  };

  detectLanguage(text: string): string {
    // Simple language detection based on character patterns
    const devanagariPattern = /[\u0900-\u097F]/;
    const bengaliPattern = /[\u0980-\u09FF]/;
    const teluguPattern = /[\u0C00-\u0C7F]/;
    const tamilPattern = /[\u0B80-\u0BFF]/;
    const arabicPattern = /[\u0600-\u06FF]/;
    
    if (devanagariPattern.test(text)) return 'hi';
    if (bengaliPattern.test(text)) return 'bn';
    if (teluguPattern.test(text)) return 'te';
    if (tamilPattern.test(text)) return 'ta';
    if (arabicPattern.test(text)) return 'ur';
    
    return 'en'; // Default to English
  }

  getTextStats(text: string): TextStats {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?।॥]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute
    
    return { characters, words, sentences, paragraphs, readingTime };
  }

  private tokenize(text: string, language: string): string[] {
    const stopWordsSet = this.stopWords[language] || this.stopWords['en'];
    
    return text.toLowerCase()
      .replace(/[^\w\s\u0900-\u097F\u0980-\u09FF\u0C00-\u0C7F\u0B80-\u0BFF\u0600-\u06FF]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0 && !stopWordsSet.has(word));
  }

  private calculateWordFrequency(text: string, language: string): Map<string, number> {
    const words = this.tokenize(text, language);
    const frequency = new Map<string, number>();
    
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    
    return frequency;
  }

  private extractKeywords(text: string, language: string, count: number = 10): string[] {
    const wordFreq = this.calculateWordFrequency(text, language);
    
    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word]) => word);
  }

  private scoreSentences(sentences: string[], wordFreq: Map<string, number>, language: string): Array<{ sentence: string; score: number; index: number }> {
    return sentences.map((sentence, index) => {
      const words = this.tokenize(sentence, language);
      const score = words.reduce((sum, word) => sum + (wordFreq.get(word) || 0), 0) / Math.max(words.length, 1);
      
      // Boost score for sentences with numbers, proper nouns, or key indicators
      let boost = 1;
      if (/\d+/.test(sentence)) boost += 0.1;
      if (/[A-Z][a-z]+/.test(sentence)) boost += 0.1;
      if (sentence.includes('महत्वपूर्ण') || sentence.includes('important') || sentence.includes('significant')) boost += 0.2;
      
      return { sentence: sentence.trim(), score: score * boost, index };
    });
  }

  summarize(text: string, options: SummaryOptions): SummaryResult {
    if (!text.trim()) {
      const emptyStats = { characters: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
      return {
        id: Math.random().toString(36).substr(2, 9),
        summary: '',
        originalText: text,
        language: options.language,
        originalStats: emptyStats,
        summaryStats: emptyStats,
        compressionRatio: 0,
        keywords: [],
        confidence: 0,
        createdAt: new Date(),
        isPublic: false,
        likes: 0,
        comments: [],
        shares: 0,
      };
    }

    const detectedLanguage = options.language || this.detectLanguage(text);
    const originalStats = this.getTextStats(text);
    
    // Split into sentences based on language-specific punctuation
    const sentenceDelimiters = detectedLanguage === 'hi' ? /[.!?।॥]+/ : /[.!?]+/;
    const sentences = text.split(sentenceDelimiters).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 1) {
      const summaryStats = this.getTextStats(text);
      return {
        id: Math.random().toString(36).substr(2, 9),
        summary: text,
        originalText: text,
        language: detectedLanguage,
        originalStats,
        summaryStats,
        compressionRatio: 1,
        keywords: this.extractKeywords(text, detectedLanguage),
        confidence: 0.5,
        createdAt: new Date(),
        isPublic: false,
        likes: 0,
        comments: [],
        shares: 0,
      };
    }

    // Calculate word frequency and extract keywords
    const wordFreq = this.calculateWordFrequency(text, detectedLanguage);
    const keywords = this.extractKeywords(text, detectedLanguage);
    
    // Score sentences
    const scoredSentences = this.scoreSentences(sentences, wordFreq, detectedLanguage);
    
    // Determine number of sentences to include
    const targetSentences = Math.max(1, Math.floor(
      sentences.length * (
        options.length === 'short' ? 0.25 :
        options.length === 'medium' ? 0.4 : 0.6
      )
    ));
    
    // Select top sentences and sort by original order
    const selectedSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, targetSentences)
      .sort((a, b) => a.index - b.index)
      .map(item => item.sentence);
    
    const summary = selectedSentences.join('. ') + (selectedSentences.length > 0 ? '.' : '');
    const summaryStats = this.getTextStats(summary);
    const compressionRatio = originalStats.words > 0 ? summaryStats.words / originalStats.words : 0;
    
    // Calculate confidence based on various factors
    const confidence = Math.min(0.95, Math.max(0.3, 
      (scoredSentences.slice(0, targetSentences).reduce((sum, s) => sum + s.score, 0) / targetSentences) * 0.1 +
      (originalStats.words > 100 ? 0.3 : 0.1) +
      (keywords.length > 5 ? 0.2 : 0.1) +
      0.4
    ));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      summary,
      originalText: text,
      language: detectedLanguage,
      originalStats,
      summaryStats,
      compressionRatio,
      keywords,
      confidence,
      createdAt: new Date(),
      isPublic: false,
      likes: 0,
      comments: [],
      shares: 0,
    };
  }
}

export const multilingualSummarizer = new MultilingualSummarizer();