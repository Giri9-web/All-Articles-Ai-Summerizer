# Advanced Multilingual Text Summarizer - Python Backend

A powerful Python-based API for multilingual text summarization supporting 22+ Indian languages with advanced AI features.

## 🌟 Features

### Core Capabilities
- **Multilingual Support**: 22+ Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, and more
- **Advanced AI Summarization**: Hybrid extractive and abstractive techniques
- **Language Detection**: Automatic script and language detection
- **Keyword Extraction**: Intelligent keyword and topic identification
- **Batch Processing**: Process multiple texts simultaneously
- **Real-time Analysis**: Text statistics and readability metrics

### API Endpoints
- `GET /api/health` - Health check and system status
- `GET /api/languages` - List supported languages
- `POST /api/detect-language` - Detect text language
- `POST /api/text-stats` - Get detailed text statistics
- `POST /api/summarize` - Generate text summary
- `POST /api/keywords` - Extract keywords
- `POST /api/batch-summarize` - Batch summarization

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. **Clone or create the backend directory**:
```bash
mkdir python_backend
cd python_backend
```

2. **Install required packages**:
```bash
pip install -r requirements.txt
```

3. **Download NLTK data** (first run only):
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

4. **Run the API server**:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## 📋 Requirements

```
flask==2.3.3
flask-cors==4.0.0
nltk==3.8.1
textstat==0.7.3
langdetect==1.0.9
numpy==1.24.3
scikit-learn==1.3.0
requests==2.31.0
python-dotenv==1.0.0
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
MAX_TEXT_LENGTH=50000
RATE_LIMIT=100
```

### Language Support
The system supports these Indian languages:
- **Hindi** (हिन्दी) - Devanagari script
- **Bengali** (বাংলা) - Bengali script  
- **Telugu** (తెలుగు) - Telugu script
- **Tamil** (தமிழ்) - Tamil script
- **Marathi** (मराठी) - Devanagari script
- **Gujarati** (ગુજરાતી) - Gujarati script
- **Kannada** (ಕನ್ನಡ) - Kannada script
- **Malayalam** (മലയാളം) - Malayalam script
- **Urdu** (اردو) - Arabic script
- **Punjabi** (ਪੰਜਾਬੀ) - Gurmukhi script
- **Odia** (ଓଡ଼ିଆ) - Odia script
- **Assamese** (অসমীয়া) - Bengali script
- **English** - Latin script

## 📖 API Usage Examples

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Detect Language
```bash
curl -X POST http://localhost:5000/api/detect-language \
  -H "Content-Type: application/json" \
  -d '{"text": "यह एक हिंदी वाक्य है।"}'
```

### 3. Generate Summary
```bash
curl -X POST http://localhost:5000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your long text here...",
    "options": {
      "length": "medium",
      "language": "hi",
      "include_keywords": true
    }
  }'
```

### 4. Extract Keywords
```bash
curl -X POST http://localhost:5000/api/keywords \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your text here...",
    "language": "hi",
    "num_keywords": 10
  }'
```

### 5. Batch Summarization
```bash
curl -X POST http://localhost:5000/api/batch-summarize \
  -H "Content-Type: application/json" \
  -d '{
    "texts": ["Text 1...", "Text 2...", "Text 3..."],
    "options": {"length": "short"}
  }'
```

## 🏗️ Architecture

### Core Components

1. **IndianLanguageProcessor**: Handles language detection, tokenization, and script processing
2. **AdvancedSummarizer**: Main summarization engine with AI algorithms
3. **TextProcessor**: Text cleaning and preprocessing utilities
4. **ValidationUtils**: Input validation and security
5. **Models**: Data structures for API requests/responses

### Summarization Algorithm

1. **Language Detection**: Automatic detection using script analysis and content patterns
2. **Text Preprocessing**: Cleaning, normalization, and tokenization
3. **Sentence Scoring**: TF-IDF based scoring with position and keyword boosts
4. **Summary Generation**: Extractive selection with abstractive refinement
5. **Quality Assessment**: Confidence scoring and readability analysis

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting protection
- CORS configuration
- Secure ID generation
- XSS prevention

## 📊 Performance

- **Processing Speed**: ~1000 words per second
- **Memory Usage**: Optimized for large texts
- **Batch Processing**: Up to 10 texts per request
- **Concurrent Requests**: Supports multiple simultaneous requests

## 🧪 Testing

Run the test suite:
```bash
python -m pytest tests/
```

## 🚀 Deployment

### Production Setup

1. **Use a production WSGI server**:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

2. **Set environment variables**:
```bash
export FLASK_ENV=production
export SECRET_KEY=your-production-secret-key
```

3. **Configure reverse proxy** (nginx example):
```nginx
location /api/ {
    proxy_pass http://localhost:5000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 🤝 Integration with React Frontend

The Python backend is designed to work seamlessly with the React frontend. Update the frontend API calls to point to your Python backend:

```javascript
// In your React app
const API_BASE_URL = 'http://localhost:5000/api';

const summarizeText = async (text, options) => {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, options }),
  });
  return response.json();
};
```

## 📈 Monitoring and Logging

The API includes comprehensive logging for:
- Request/response tracking
- Error monitoring
- Performance metrics
- Language detection accuracy
- Summarization quality scores

## 🛠️ Development

### Adding New Languages

1. Add language configuration in `config.py`
2. Add stopwords in `IndianLanguageProcessor`
3. Update script detection ranges
4. Test with sample texts

### Extending Summarization

1. Implement new algorithms in `AdvancedSummarizer`
2. Add configuration options
3. Update API endpoints
4. Add comprehensive tests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@bharatsummarizer.com
- GitHub Issues: Create an issue for bugs or feature requests
- Documentation: Check the API documentation for detailed usage

---

**Built with ❤️ for the Indian language community**