"""
Data models for the Advanced Multilingual Summarizer
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from datetime import datetime
import json

@dataclass
class TextStats:
    """Text statistics model"""
    characters: int
    words: int
    sentences: int
    paragraphs: int
    reading_time: int  # in minutes
    
    def to_dict(self) -> Dict[str, int]:
        return {
            'characters': self.characters,
            'words': self.words,
            'sentences': self.sentences,
            'paragraphs': self.paragraphs,
            'reading_time': self.reading_time
        }

@dataclass
class Language:
    """Language model"""
    code: str
    name: str
    native_name: str
    script: str
    direction: str = 'ltr'
    family: str = ''
    
    def to_dict(self) -> Dict[str, str]:
        return {
            'code': self.code,
            'name': self.name,
            'native_name': self.native_name,
            'script': self.script,
            'direction': self.direction,
            'family': self.family
        }

@dataclass
class SummaryOptions:
    """Summary generation options"""
    length: str = 'medium'  # short, medium, long
    language: Optional[str] = None
    preserve_formatting: bool = False
    include_keywords: bool = True
    max_keywords: int = 10
    confidence_threshold: float = 0.3
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'length': self.length,
            'language': self.language,
            'preserve_formatting': self.preserve_formatting,
            'include_keywords': self.include_keywords,
            'max_keywords': self.max_keywords,
            'confidence_threshold': self.confidence_threshold
        }

@dataclass
class Comment:
    """Comment model for social features"""
    id: str
    user_id: str
    user_name: str
    user_avatar: Optional[str]
    content: str
    created_at: datetime
    likes: int = 0
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.user_name,
            'user_avatar': self.user_avatar,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'likes': self.likes
        }

@dataclass
class SummaryResult:
    """Complete summary result model"""
    id: str
    summary: str
    original_text: str
    language: str
    original_stats: TextStats
    summary_stats: TextStats
    compression_ratio: float
    keywords: List[str]
    confidence: float
    created_at: datetime
    is_public: bool = False
    likes: int = 0
    comments: List[Comment] = field(default_factory=list)
    shares: int = 0
    user_id: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'id': self.id,
            'summary': self.summary,
            'original_text': self.original_text,
            'language': self.language,
            'original_stats': self.original_stats.to_dict(),
            'summary_stats': self.summary_stats.to_dict(),
            'compression_ratio': self.compression_ratio,
            'keywords': self.keywords,
            'confidence': self.confidence,
            'created_at': self.created_at.isoformat(),
            'is_public': self.is_public,
            'likes': self.likes,
            'comments': [comment.to_dict() for comment in self.comments],
            'shares': self.shares,
            'user_id': self.user_id
        }
    
    def to_json(self) -> str:
        """Convert to JSON string"""
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)

@dataclass
class BatchSummaryRequest:
    """Batch summarization request model"""
    texts: List[str]
    options: SummaryOptions
    user_id: Optional[str] = None
    
    def validate(self) -> List[str]:
        """Validate batch request and return list of errors"""
        errors = []
        
        if not self.texts:
            errors.append("Texts array is required")
        
        if len(self.texts) > 10:
            errors.append("Maximum 10 texts allowed per batch")
        
        for i, text in enumerate(self.texts):
            if not text.strip():
                errors.append(f"Text {i+1} is empty")
            elif len(text.split()) < 10:
                errors.append(f"Text {i+1} must contain at least 10 words")
        
        return errors

@dataclass
class APIResponse:
    """Standard API response model"""
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime = field(default_factory=datetime.now)
    
    def to_dict(self) -> Dict[str, Any]:
        response = {
            'success': self.success,
            'timestamp': self.timestamp.isoformat()
        }
        
        if self.data is not None:
            response['data'] = self.data
        
        if self.error:
            response['error'] = self.error
        
        if self.message:
            response['message'] = self.message
        
        return response
    
    def to_json(self) -> str:
        """Convert to JSON string"""
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)

@dataclass
class LanguageDetectionResult:
    """Language detection result model"""
    detected_language: str
    language_name: str
    script: str
    confidence: float
    alternatives: List[Dict[str, Any]] = field(default_factory=list)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'detected_language': self.detected_language,
            'language_name': self.language_name,
            'script': self.script,
            'confidence': self.confidence,
            'alternatives': self.alternatives
        }

@dataclass
class KeywordExtractionResult:
    """Keyword extraction result model"""
    keywords: List[str]
    language: str
    count: int
    scores: Optional[List[float]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        result = {
            'keywords': self.keywords,
            'language': self.language,
            'count': self.count
        }
        
        if self.scores:
            result['scores'] = self.scores
        
        return result

# Utility functions for model creation
def create_text_stats(text: str) -> TextStats:
    """Create TextStats from text"""
    import math
    
    characters = len(text)
    words = len(text.split()) if text.strip() else 0
    sentences = len([s for s in text.split('.') if s.strip()])
    paragraphs = len([p for p in text.split('\n\n') if p.strip()])
    reading_time = max(1, math.ceil(words / 200))
    
    return TextStats(characters, words, sentences, paragraphs, reading_time)

def create_summary_options(data: Dict[str, Any]) -> SummaryOptions:
    """Create SummaryOptions from dictionary"""
    return SummaryOptions(
        length=data.get('length', 'medium'),
        language=data.get('language'),
        preserve_formatting=data.get('preserve_formatting', False),
        include_keywords=data.get('include_keywords', True),
        max_keywords=data.get('max_keywords', 10),
        confidence_threshold=data.get('confidence_threshold', 0.3)
    )