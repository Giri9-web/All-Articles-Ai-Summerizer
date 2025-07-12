"""
Utility functions for the Advanced Multilingual Summarizer
"""

import re
import string
import random
import hashlib
from typing import List, Dict, Set, Tuple, Optional
from datetime import datetime
import unicodedata

class TextProcessor:
    """Advanced text processing utilities"""
    
    @staticmethod
    def clean_text(text: str) -> str:
        """Clean and normalize text"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters but keep Indian language characters
        text = re.sub(r'[^\w\s\u0900-\u097F\u0980-\u09FF\u0C00-\u0C7F\u0B80-\u0BFF\u0600-\u06FF\u0A80-\u0AFF\u0C80-\u0CFF\u0D00-\u0D7F\u0B00-\u0B7F\u0A00-\u0A7F\u0900-\u097F]', ' ', text)
        
        # Normalize unicode
        text = unicodedata.normalize('NFKC', text)
        
        return text.strip()
    
    @staticmethod
    def extract_sentences(text: str, language: str = 'en') -> List[str]:
        """Extract sentences from text based on language"""
        # Language-specific sentence delimiters
        delimiters = {
            'hi': r'[.!?।॥]+',
            'bn': r'[.!?।॥]+',
            'te': r'[.!?।॥]+',
            'ta': r'[.!?।॥]+',
            'mr': r'[.!?।॥]+',
            'gu': r'[.!?।॥]+',
            'kn': r'[.!?।॥]+',
            'ml': r'[.!?।॥]+',
            'or': r'[.!?।॥]+',
            'pa': r'[.!?।॥]+',
            'ur': r'[.!?।॥]+',
            'as': r'[.!?।॥]+',
            'default': r'[.!?]+'
        }
        
        delimiter = delimiters.get(language, delimiters['default'])
        sentences = re.split(delimiter, text)
        
        # Clean and filter sentences
        cleaned_sentences = []
        for sentence in sentences:
            sentence = sentence.strip()
            if sentence and len(sentence.split()) >= 3:  # Minimum 3 words
                cleaned_sentences.append(sentence)
        
        return cleaned_sentences
    
    @staticmethod
    def calculate_readability(text: str) -> Dict[str, float]:
        """Calculate readability metrics"""
        words = text.split()
        sentences = TextProcessor.extract_sentences(text)
        
        if not words or not sentences:
            return {'flesch_score': 0.0, 'avg_words_per_sentence': 0.0, 'complexity': 'unknown'}
        
        # Basic readability calculations
        avg_words_per_sentence = len(words) / len(sentences)
        avg_syllables_per_word = sum(TextProcessor.count_syllables(word) for word in words) / len(words)
        
        # Simplified Flesch Reading Ease Score
        flesch_score = 206.835 - (1.015 * avg_words_per_sentence) - (84.6 * avg_syllables_per_word)
        flesch_score = max(0, min(100, flesch_score))  # Clamp between 0-100
        
        # Determine complexity
        if flesch_score >= 70:
            complexity = 'easy'
        elif flesch_score >= 50:
            complexity = 'moderate'
        else:
            complexity = 'difficult'
        
        return {
            'flesch_score': round(flesch_score, 2),
            'avg_words_per_sentence': round(avg_words_per_sentence, 2),
            'avg_syllables_per_word': round(avg_syllables_per_word, 2),
            'complexity': complexity
        }
    
    @staticmethod
    def count_syllables(word: str) -> int:
        """Count syllables in a word (simplified)"""
        word = word.lower()
        vowels = 'aeiouाेिीुूैौअआइईउऊएऐओऔ'
        syllable_count = 0
        prev_was_vowel = False
        
        for char in word:
            is_vowel = char in vowels
            if is_vowel and not prev_was_vowel:
                syllable_count += 1
            prev_was_vowel = is_vowel
        
        return max(1, syllable_count)  # At least 1 syllable per word

class LanguageUtils:
    """Language-specific utilities"""
    
    SCRIPT_RANGES = {
        'devanagari': (0x0900, 0x097F),
        'bengali': (0x0980, 0x09FF),
        'telugu': (0x0C00, 0x0C7F),
        'tamil': (0x0B80, 0x0BFF),
        'gujarati': (0x0A80, 0x0AFF),
        'kannada': (0x0C80, 0x0CFF),
        'malayalam': (0x0D00, 0x0D7F),
        'odia': (0x0B00, 0x0B7F),
        'gurmukhi': (0x0A00, 0x0A7F),
        'arabic': (0x0600, 0x06FF)
    }
    
    @staticmethod
    def detect_script(text: str) -> Dict[str, int]:
        """Detect scripts used in text"""
        script_counts = {script: 0 for script in LanguageUtils.SCRIPT_RANGES}
        
        for char in text:
            code_point = ord(char)
            for script, (start, end) in LanguageUtils.SCRIPT_RANGES.items():
                if start <= code_point <= end:
                    script_counts[script] += 1
                    break
        
        return script_counts
    
    @staticmethod
    def is_rtl_language(language: str) -> bool:
        """Check if language is right-to-left"""
        rtl_languages = {'ur', 'ar', 'fa', 'he'}
        return language in rtl_languages
    
    @staticmethod
    def get_language_family(language: str) -> str:
        """Get language family"""
        families = {
            'hi': 'Indo-Aryan', 'bn': 'Indo-Aryan', 'mr': 'Indo-Aryan',
            'gu': 'Indo-Aryan', 'or': 'Indo-Aryan', 'pa': 'Indo-Aryan',
            'as': 'Indo-Aryan', 'ur': 'Indo-Aryan', 'ne': 'Indo-Aryan',
            'te': 'Dravidian', 'ta': 'Dravidian', 'kn': 'Dravidian',
            'ml': 'Dravidian', 'en': 'Germanic'
        }
        return families.get(language, 'Unknown')

class ValidationUtils:
    """Input validation utilities"""
    
    @staticmethod
    def validate_text_input(text: str, min_words: int = 10, max_length: int = 50000) -> Tuple[bool, Optional[str]]:
        """Validate text input"""
        if not text or not text.strip():
            return False, "Text cannot be empty"
        
        if len(text) > max_length:
            return False, f"Text exceeds maximum length of {max_length} characters"
        
        word_count = len(text.split())
        if word_count < min_words:
            return False, f"Text must contain at least {min_words} words (current: {word_count})"
        
        return True, None
    
    @staticmethod
    def validate_language_code(language: str, supported_languages: List[str]) -> Tuple[bool, Optional[str]]:
        """Validate language code"""
        if not language:
            return False, "Language code is required"
        
        if language not in supported_languages:
            return False, f"Unsupported language: {language}"
        
        return True, None
    
    @staticmethod
    def validate_summary_options(options: Dict) -> Tuple[bool, Optional[str]]:
        """Validate summary options"""
        valid_lengths = ['short', 'medium', 'long']
        
        if 'length' in options and options['length'] not in valid_lengths:
            return False, f"Invalid length. Must be one of: {', '.join(valid_lengths)}"
        
        if 'max_keywords' in options:
            max_keywords = options['max_keywords']
            if not isinstance(max_keywords, int) or max_keywords < 1 or max_keywords > 50:
                return False, "max_keywords must be an integer between 1 and 50"
        
        return True, None

class SecurityUtils:
    """Security and sanitization utilities"""
    
    @staticmethod
    def generate_secure_id(length: int = 12) -> str:
        """Generate secure random ID"""
        characters = string.ascii_letters + string.digits
        return ''.join(random.SystemRandom().choice(characters) for _ in range(length))
    
    @staticmethod
    def hash_text(text: str) -> str:
        """Generate hash of text for deduplication"""
        return hashlib.sha256(text.encode('utf-8')).hexdigest()
    
    @staticmethod
    def sanitize_user_input(text: str) -> str:
        """Sanitize user input to prevent XSS"""
        # Remove potentially dangerous characters
        dangerous_chars = ['<', '>', '"', "'", '&', '\x00']
        for char in dangerous_chars:
            text = text.replace(char, '')
        
        return text.strip()
    
    @staticmethod
    def rate_limit_key(user_id: str, endpoint: str) -> str:
        """Generate rate limiting key"""
        return f"rate_limit:{user_id}:{endpoint}:{datetime.now().strftime('%Y%m%d%H%M')}"

class PerformanceUtils:
    """Performance optimization utilities"""
    
    @staticmethod
    def chunk_text(text: str, chunk_size: int = 1000) -> List[str]:
        """Split large text into chunks for processing"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), chunk_size):
            chunk = ' '.join(words[i:i + chunk_size])
            chunks.append(chunk)
        
        return chunks
    
    @staticmethod
    def estimate_processing_time(text: str) -> float:
        """Estimate processing time in seconds"""
        word_count = len(text.split())
        # Rough estimate: 1000 words per second
        return max(0.5, word_count / 1000)
    
    @staticmethod
    def optimize_keywords(keywords: List[str], max_keywords: int = 10) -> List[str]:
        """Optimize keyword list by removing duplicates and limiting count"""
        # Remove duplicates while preserving order
        seen = set()
        unique_keywords = []
        for keyword in keywords:
            if keyword.lower() not in seen:
                seen.add(keyword.lower())
                unique_keywords.append(keyword)
        
        return unique_keywords[:max_keywords]

# Export utility classes
__all__ = [
    'TextProcessor',
    'LanguageUtils', 
    'ValidationUtils',
    'SecurityUtils',
    'PerformanceUtils'
]