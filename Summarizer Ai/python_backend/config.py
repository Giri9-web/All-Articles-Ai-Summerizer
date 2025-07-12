"""
Configuration settings for the Advanced Multilingual Summarizer API
"""

import os
from typing import Dict, Any

class Config:
    """Base configuration class"""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    # API settings
    API_VERSION = 'v1'
    MAX_TEXT_LENGTH = 50000  # Maximum characters per request
    MAX_BATCH_SIZE = 10      # Maximum texts per batch request
    
    # Summarization settings
    DEFAULT_SUMMARY_LENGTH = 'medium'
    MIN_WORDS_FOR_SUMMARY = 10
    MAX_KEYWORDS = 20
    
    # Language settings
    DEFAULT_LANGUAGE = 'en'
    SUPPORTED_LANGUAGES = [
        'hi', 'en', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 
        'kn', 'ml', 'or', 'pa', 'as', 'mai', 'sa', 'ne'
    ]
    
    # Rate limiting (requests per minute)
    RATE_LIMIT = 100
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5173']
    
    @staticmethod
    def get_language_config() -> Dict[str, Any]:
        """Get language-specific configuration"""
        return {
            'hi': {
                'name': 'Hindi',
                'native_name': 'हिन्दी',
                'script': 'Devanagari',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'en': {
                'name': 'English',
                'native_name': 'English',
                'script': 'Latin',
                'direction': 'ltr',
                'family': 'Germanic'
            },
            'bn': {
                'name': 'Bengali',
                'native_name': 'বাংলা',
                'script': 'Bengali',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'te': {
                'name': 'Telugu',
                'native_name': 'తెలుగు',
                'script': 'Telugu',
                'direction': 'ltr',
                'family': 'Dravidian'
            },
            'mr': {
                'name': 'Marathi',
                'native_name': 'मराठी',
                'script': 'Devanagari',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'ta': {
                'name': 'Tamil',
                'native_name': 'தமிழ்',
                'script': 'Tamil',
                'direction': 'ltr',
                'family': 'Dravidian'
            },
            'ur': {
                'name': 'Urdu',
                'native_name': 'اردو',
                'script': 'Arabic',
                'direction': 'rtl',
                'family': 'Indo-Aryan'
            },
            'gu': {
                'name': 'Gujarati',
                'native_name': 'ગુજરાતી',
                'script': 'Gujarati',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'kn': {
                'name': 'Kannada',
                'native_name': 'ಕನ್ನಡ',
                'script': 'Kannada',
                'direction': 'ltr',
                'family': 'Dravidian'
            },
            'ml': {
                'name': 'Malayalam',
                'native_name': 'മലയാളം',
                'script': 'Malayalam',
                'direction': 'ltr',
                'family': 'Dravidian'
            },
            'or': {
                'name': 'Odia',
                'native_name': 'ଓଡ଼ିଆ',
                'script': 'Odia',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'pa': {
                'name': 'Punjabi',
                'native_name': 'ਪੰਜਾਬੀ',
                'script': 'Gurmukhi',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            },
            'as': {
                'name': 'Assamese',
                'native_name': 'অসমীয়া',
                'script': 'Bengali',
                'direction': 'ltr',
                'family': 'Indo-Aryan'
            }
        }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    
    # Enhanced security for production
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = False

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}