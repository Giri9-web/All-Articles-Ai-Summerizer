import { SummaryOptions, TextStats, SummaryResult } from '../types';

export class TextSummarizer {
  private stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'would', 'could', 'should', 'might',
    'can', 'may', 'must', 'shall', 'this', 'these', 'they', 'them',
    'their', 'there', 'where', 'when', 'what', 'who', 'how', 'why'
  ]);

  getTextStats(text: string): TextStats {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    return { characters, words, sentences };
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0 && !this.stopWords.has(word));
  }

  private calculateWordFrequency(text: string): Map<string, number> {
    const words = this.tokenize(text);
    const frequency = new Map<string, number>();
    
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    
    return frequency;
  }

  private scoreSentences(sentences: string[], wordFreq: Map<string, number>): Array<{ sentence: string; score: number; index: number }> {
    return sentences.map((sentence, index) => {
      const words = this.tokenize(sentence);
      const score = words.reduce((sum, word) => sum + (wordFreq.get(word) || 0), 0) / Math.max(words.length, 1);
      
      return { sentence: sentence.trim(), score, index };
    });
  }

  summarize(text: string, options: SummaryOptions): SummaryResult {
    if (!text.trim()) {
      const emptyStats = { characters: 0, words: 0, sentences: 0 };
      return {
        summary: '',
        originalStats: emptyStats,
        summaryStats: emptyStats,
        compressionRatio: 0
      };
    }

    const originalStats = this.getTextStats(text);
    
    // Split into sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 1) {
      const summaryStats = this.getTextStats(text);
      return {
        summary: text,
        originalStats,
        summaryStats,
        compressionRatio: 1
      };
    }

    // Calculate word frequency
    const wordFreq = this.calculateWordFrequency(text);
    
    // Score sentences
    const scoredSentences = this.scoreSentences(sentences, wordFreq);
    
    // Determine number of sentences to include
    const targetSentences = Math.max(1, Math.floor(
      sentences.length * (
        options.length === 'short' ? 0.3 :
        options.length === 'medium' ? 0.5 : 0.7
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
    
    return {
      summary,
      originalStats,
      summaryStats,
      compressionRatio
    };
  }
}

export const summarizer = new TextSummarizer();