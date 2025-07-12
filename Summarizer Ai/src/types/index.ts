export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isGuest: boolean;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  defaultLanguage: string;
  summaryLength: 'short' | 'medium' | 'long';
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
}

export interface SummaryOptions {
  length: 'short' | 'medium' | 'long';
  language: string;
  preserveFormatting: boolean;
  includeKeywords: boolean;
}

export interface TextStats {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export interface SummaryResult {
  id: string;
  summary: string;
  originalText: string;
  language: string;
  originalStats: TextStats;
  summaryStats: TextStats;
  compressionRatio: number;
  keywords: string[];
  confidence: number;
  createdAt: Date;
  userId?: string;
  isPublic: boolean;
  likes: number;
  comments: Comment[];
  shares: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  family: string;
}

export interface ComparisonFeature {
  feature: string;
  ourApp: boolean | string;
  competitor1: boolean | string;
  competitor2: boolean | string;
  competitor3: boolean | string;
}

export interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: Date;
}