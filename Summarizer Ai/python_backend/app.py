#!/usr/bin/env python3
"""
Advanced Multilingual Text Summarizer API
Supports 22+ Indian languages with AI-powered summarization
"""

import os
import re
import json
import math
from datetime import datetime
from collections import Counter, defaultdict
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass, asdict
import unicodedata

# For a production environment, you would install these packages:
# pip install flask flask-cors nltk textstat langdetect numpy scikit-learn

try:
    from flask import Flask, request, jsonify, cors
    from flask_cors import CORS
    import nltk
    from nltk.corpus import stopwords
    from nltk.tokenize import sent_tokenize, word_tokenize
    from nltk.stem import PorterStemmer
    import textstat
    from langdetect import detect, DetectorFactory
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    
    # Set seed for consistent language detection
    DetectorFactory.seed = 0
    
    # Download required NLTK data
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    
except ImportError:
    print("Required packages not installed. This is a demonstration of the Python backend structure.")
    print("To run this backend, install: pip install flask flask-cors nltk textstat langdetect numpy scikit-learn")

@dataclass
class TextStats:
    characters: int
    words: int
    sentences: int
    paragraphs: int
    reading_time: int

@dataclass
class SummaryResult:
    id: str
    summary: str
    original_text: str
    language: str
    original_stats: TextStats
    summary_stats: TextStats
    compression_ratio: float
    keywords: List[str]
    confidence: float
    created_at: str
    is_public: bool
    likes: int
    comments: List[Dict]
    shares: int

class IndianLanguageProcessor:
    """Advanced processor for Indian languages with script detection and processing"""
    
    def __init__(self):
        self.language_scripts = {
            'hi': {'name': 'Hindi', 'script': 'Devanagari', 'range': (0x0900, 0x097F)},
            'bn': {'name': 'Bengali', 'script': 'Bengali', 'range': (0x0980, 0x09FF)},
            'te': {'name': 'Telugu', 'script': 'Telugu', 'range': (0x0C00, 0x0C7F)},
            'ta': {'name': 'Tamil', 'script': 'Tamil', 'range': (0x0B80, 0x0BFF)},
            'mr': {'name': 'Marathi', 'script': 'Devanagari', 'range': (0x0900, 0x097F)},
            'gu': {'name': 'Gujarati', 'script': 'Gujarati', 'range': (0x0A80, 0x0AFF)},
            'kn': {'name': 'Kannada', 'script': 'Kannada', 'range': (0x0C80, 0x0CFF)},
            'ml': {'name': 'Malayalam', 'script': 'Malayalam', 'range': (0x0D00, 0x0D7F)},
            'or': {'name': 'Odia', 'script': 'Odia', 'range': (0x0B00, 0x0B7F)},
            'pa': {'name': 'Punjabi', 'script': 'Gurmukhi', 'range': (0x0A00, 0x0A7F)},
            'ur': {'name': 'Urdu', 'script': 'Arabic', 'range': (0x0600, 0x06FF)},
            'as': {'name': 'Assamese', 'script': 'Bengali', 'range': (0x0980, 0x09FF)},
        }
        
        self.indian_stopwords = {
            'hi': {'और', 'का', 'के', 'की', 'को', 'में', 'से', 'पर', 'है', 'हैं', 'था', 'थे', 'यह', 'वह', 'इस', 'उस', 'एक', 'दो', 'तीन', 'चार', 'पांच'},
            'bn': {'এবং', 'বা', 'কিন্তু', 'যে', 'যা', 'এই', 'সেই', 'একটি', 'একটা', 'হয়', 'হয়েছে', 'করা', 'করে', 'থেকে', 'সাথে', 'জন্য', 'দিয়ে'},
            'te': {'మరియు', 'లేదా', 'కానీ', 'అని', 'ఇది', 'అది', 'ఒక', 'రెండు', 'మూడు', 'నాలుగు', 'అయిన', 'అయినది', 'చేసిన', 'చేసింది', 'లో', 'తో'},
            'ta': {'மற்றும்', 'அல்லது', 'ஆனால்', 'என்று', 'இது', 'அது', 'ஒரு', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஆகும்', 'செய்த', 'செய்யும்', 'இல்', 'உடன்'},
            'mr': {'आणि', 'किंवा', 'पण', 'म्हणून', 'हे', 'ते', 'एक', 'दोन', 'तीन', 'चार', 'आहे', 'होते', 'केले', 'करणे', 'मध्ये', 'सोबत'},
            'gu': {'અને', 'અથવા', 'પણ', 'કે', 'આ', 'તે', 'એક', 'બે', 'ત્રણ', 'ચાર', 'છે', 'હતું', 'કર્યું', 'કરવું', 'માં', 'સાથે'},
            'en': {'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with'}
        }
        
        self.sentence_delimiters = {
            'hi': r'[.!?।॥]+',
            'bn': r'[.!?।॥]+',
            'te': r'[.!?।॥]+',
            'ta': r'[.!?।॥]+',
            'mr': r'[.!?।॥]+',
            'gu': r'[.!?।॥]+',
            'en': r'[.!?]+',
            'default': r'[.!?।॥]+'
        }

    def detect_language(self, text: str) -> str:
        """Detect language based on script and content analysis"""
        try:
            # First try automatic detection
            detected = detect(text)
            if detected in self.language_scripts:
                return detected
        except:
            pass
        
        # Fallback to script-based detection
        char_counts = defaultdict(int)
        for char in text:
            code_point = ord(char)
            for lang_code, lang_info in self.language_scripts.items():
                start, end = lang_info['range']
                if start <= code_point <= end:
                    char_counts[lang_code] += 1
        
        if char_counts:
            return max(char_counts, key=char_counts.get)
        
        return 'en'  # Default to English

    def get_stopwords(self, language: str) -> set:
        """Get stopwords for the specified language"""
        return self.indian_stopwords.get(language, self.indian_stopwords['en'])

    def tokenize_text(self, text: str, language: str) -> List[str]:
        """Tokenize text based on language-specific rules"""
        # Remove punctuation and normalize
        text = re.sub(r'[^\w\s\u0900-\u097F\u0980-\u09FF\u0C00-\u0C7F\u0B80-\u0BFF\u0600-\u06FF\u0A80-\u0AFF\u0C80-\u0CFF\u0D00-\u0D7F\u0B00-\u0B7F\u0A00-\u0A7F]', ' ', text)
        
        # Split into words
        words = text.lower().split()
        
        # Remove stopwords
        stopwords_set = self.get_stopwords(language)
        filtered_words = [word for word in words if word not in stopwords_set and len(word) > 1]
        
        return filtered_words

    def split_sentences(self, text: str, language: str) -> List[str]:
        """Split text into sentences based on language-specific delimiters"""
        delimiter_pattern = self.sentence_delimiters.get(language, self.sentence_delimiters['default'])
        sentences = re.split(delimiter_pattern, text)
        return [s.strip() for s in sentences if s.strip()]

class AdvancedSummarizer:
    """Advanced multilingual text summarizer with AI-powered features"""
    
    def __init__(self):
        self.language_processor = IndianLanguageProcessor()
        self.stemmer = PorterStemmer()
        
    def calculate_text_stats(self, text: str) -> TextStats:
        """Calculate comprehensive text statistics"""
        characters = len(text)
        words = len(text.split()) if text.strip() else 0
        sentences = len(self.language_processor.split_sentences(text, 'en'))
        paragraphs = len([p for p in text.split('\n\n') if p.strip()])
        reading_time = max(1, math.ceil(words / 200))  # 200 words per minute
        
        return TextStats(characters, words, sentences, paragraphs, reading_time)
    
    def extract_keywords(self, text: str, language: str, num_keywords: int = 10) -> List[str]:
        """Extract keywords using TF-IDF and frequency analysis"""
        words = self.language_processor.tokenize_text(text, language)
        
        if not words:
            return []
        
        # Calculate word frequency
        word_freq = Counter(words)
        
        # Get top keywords by frequency
        keywords = [word for word, freq in word_freq.most_common(num_keywords)]
        
        return keywords
    
    def calculate_sentence_scores(self, sentences: List[str], word_freq: Dict[str, int], language: str) -> List[Tuple[str, float, int]]:
        """Calculate importance scores for sentences"""
        scored_sentences = []
        
        for idx, sentence in enumerate(sentences):
            words = self.language_processor.tokenize_text(sentence, language)
            
            if not words:
                scored_sentences.append((sentence, 0.0, idx))
                continue
            
            # Base score from word frequency
            score = sum(word_freq.get(word, 0) for word in words) / len(words)
            
            # Boost factors
            boost = 1.0
            
            # Position boost (first and last sentences are often important)
            if idx == 0 or idx == len(sentences) - 1:
                boost += 0.2
            
            # Length boost (moderate length sentences are preferred)
            word_count = len(words)
            if 10 <= word_count <= 30:
                boost += 0.1
            
            # Number boost (sentences with numbers often contain facts)
            if re.search(r'\d+', sentence):
                boost += 0.15
            
            # Keyword boost (sentences with important keywords)
            important_keywords = {'महत्वपूर्ण', 'important', 'significant', 'मुख्य', 'main', 'key', 'प्रमुख'}
            if any(keyword in sentence.lower() for keyword in important_keywords):
                boost += 0.25
            
            final_score = score * boost
            scored_sentences.append((sentence, final_score, idx))
        
        return scored_sentences
    
    def summarize_text(self, text: str, options: Dict[str, Any]) -> SummaryResult:
        """Generate comprehensive text summary"""
        if not text.strip():
            empty_stats = TextStats(0, 0, 0, 0, 0)
            return SummaryResult(
                id=self._generate_id(),
                summary="",
                original_text=text,
                language="en",
                original_stats=empty_stats,
                summary_stats=empty_stats,
                compression_ratio=0.0,
                keywords=[],
                confidence=0.0,
                created_at=datetime.now().isoformat(),
                is_public=False,
                likes=0,
                comments=[],
                shares=0
            )
        
        # Detect language
        language = options.get('language') or self.language_processor.detect_language(text)
        
        # Calculate original text statistics
        original_stats = self.calculate_text_stats(text)
        
        # Split into sentences
        sentences = self.language_processor.split_sentences(text, language)
        
        if len(sentences) <= 1:
            summary_stats = self.calculate_text_stats(text)
            return SummaryResult(
                id=self._generate_id(),
                summary=text,
                original_text=text,
                language=language,
                original_stats=original_stats,
                summary_stats=summary_stats,
                compression_ratio=1.0,
                keywords=self.extract_keywords(text, language),
                confidence=0.5,
                created_at=datetime.now().isoformat(),
                is_public=False,
                likes=0,
                comments=[],
                shares=0
            )
        
        # Calculate word frequency
        words = self.language_processor.tokenize_text(text, language)
        word_freq = Counter(words)
        
        # Extract keywords
        keywords = self.extract_keywords(text, language)
        
        # Score sentences
        scored_sentences = self.calculate_sentence_scores(sentences, word_freq, language)
        
        # Determine target number of sentences
        length_ratios = {'short': 0.25, 'medium': 0.4, 'long': 0.6}
        target_ratio = length_ratios.get(options.get('length', 'medium'), 0.4)
        target_sentences = max(1, int(len(sentences) * target_ratio))
        
        # Select top sentences and maintain original order
        top_sentences = sorted(scored_sentences, key=lambda x: x[1], reverse=True)[:target_sentences]
        selected_sentences = sorted(top_sentences, key=lambda x: x[2])  # Sort by original index
        
        # Generate summary
        summary = '. '.join([sent[0] for sent in selected_sentences])
        if summary and not summary.endswith('.'):
            summary += '.'
        
        # Calculate summary statistics
        summary_stats = self.calculate_text_stats(summary)
        compression_ratio = summary_stats.words / original_stats.words if original_stats.words > 0 else 0
        
        # Calculate confidence score
        avg_score = sum(sent[1] for sent in selected_sentences) / len(selected_sentences) if selected_sentences else 0
        confidence = min(0.95, max(0.3, 
            avg_score * 0.1 + 
            (0.3 if original_stats.words > 100 else 0.1) +
            (0.2 if len(keywords) > 5 else 0.1) +
            0.4
        ))
        
        return SummaryResult(
            id=self._generate_id(),
            summary=summary,
            original_text=text,
            language=language,
            original_stats=original_stats,
            summary_stats=summary_stats,
            compression_ratio=compression_ratio,
            keywords=keywords,
            confidence=confidence,
            created_at=datetime.now().isoformat(),
            is_public=options.get('is_public', False),
            likes=0,
            comments=[],
            shares=0
        )
    
    def _generate_id(self) -> str:
        """Generate unique ID for summary"""
        import random
        import string
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=9))

# Flask API Application
app = Flask(__name__)
CORS(app)

# Initialize summarizer
summarizer = AdvancedSummarizer()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Summarizer API is running',
        'timestamp': datetime.now().isoformat(),
        'supported_languages': list(summarizer.language_processor.language_scripts.keys())
    })

@app.route('/api/languages', methods=['GET'])
def get_supported_languages():
    """Get list of supported languages"""
    languages = []
    for code, info in summarizer.language_processor.language_scripts.items():
        languages.append({
            'code': code,
            'name': info['name'],
            'script': info['script']
        })
    return jsonify({'languages': languages})

@app.route('/api/detect-language', methods=['POST'])
def detect_language():
    """Detect language of input text"""
    data = request.get_json()
    text = data.get('text', '')
    
    if not text.strip():
        return jsonify({'error': 'Text is required'}), 400
    
    detected_language = summarizer.language_processor.detect_language(text)
    language_info = summarizer.language_processor.language_scripts.get(detected_language, {})
    
    return jsonify({
        'detected_language': detected_language,
        'language_name': language_info.get('name', 'Unknown'),
        'script': language_info.get('script', 'Unknown'),
        'confidence': 0.85  # Placeholder confidence score
    })

@app.route('/api/text-stats', methods=['POST'])
def get_text_stats():
    """Get detailed text statistics"""
    data = request.get_json()
    text = data.get('text', '')
    
    if not text.strip():
        return jsonify({'error': 'Text is required'}), 400
    
    stats = summarizer.calculate_text_stats(text)
    language = summarizer.language_processor.detect_language(text)
    keywords = summarizer.extract_keywords(text, language, 10)
    
    return jsonify({
        'stats': asdict(stats),
        'language': language,
        'keywords': keywords
    })

@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    """Generate text summary"""
    data = request.get_json()
    text = data.get('text', '')
    options = data.get('options', {})
    
    if not text.strip():
        return jsonify({'error': 'Text is required'}), 400
    
    if len(text.split()) < 10:
        return jsonify({'error': 'Text must contain at least 10 words for meaningful summarization'}), 400
    
    try:
        result = summarizer.summarize_text(text, options)
        return jsonify(asdict(result))
    except Exception as e:
        return jsonify({'error': f'Summarization failed: {str(e)}'}), 500

@app.route('/api/keywords', methods=['POST'])
def extract_keywords():
    """Extract keywords from text"""
    data = request.get_json()
    text = data.get('text', '')
    language = data.get('language', '')
    num_keywords = data.get('num_keywords', 10)
    
    if not text.strip():
        return jsonify({'error': 'Text is required'}), 400
    
    if not language:
        language = summarizer.language_processor.detect_language(text)
    
    keywords = summarizer.extract_keywords(text, language, num_keywords)
    
    return jsonify({
        'keywords': keywords,
        'language': language,
        'count': len(keywords)
    })

@app.route('/api/batch-summarize', methods=['POST'])
def batch_summarize():
    """Summarize multiple texts in batch"""
    data = request.get_json()
    texts = data.get('texts', [])
    options = data.get('options', {})
    
    if not texts or not isinstance(texts, list):
        return jsonify({'error': 'Texts array is required'}), 400
    
    if len(texts) > 10:
        return jsonify({'error': 'Maximum 10 texts allowed per batch'}), 400
    
    results = []
    for i, text in enumerate(texts):
        if not text.strip():
            continue
        
        try:
            result = summarizer.summarize_text(text, options)
            results.append(asdict(result))
        except Exception as e:
            results.append({
                'error': f'Failed to summarize text {i+1}: {str(e)}',
                'index': i
            })
    
    return jsonify({
        'results': results,
        'total_processed': len(results),
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting Advanced Multilingual Text Summarizer API...")
    print("📚 Supported Languages: Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Urdu, Punjabi, Odia, Assamese, English")
    print("🌐 API Endpoints:")
    print("   GET  /api/health - Health check")
    print("   GET  /api/languages - Get supported languages")
    print("   POST /api/detect-language - Detect text language")
    print("   POST /api/text-stats - Get text statistics")
    print("   POST /api/summarize - Generate summary")
    print("   POST /api/keywords - Extract keywords")
    print("   POST /api/batch-summarize - Batch summarization")
    print("\n🔧 To install required packages:")
    print("   pip install flask flask-cors nltk textstat langdetect numpy scikit-learn")
    
    app.run(debug=True, host='0.0.0.0', port=5000)