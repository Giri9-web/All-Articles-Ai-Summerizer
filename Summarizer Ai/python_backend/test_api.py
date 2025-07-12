#!/usr/bin/env python3
"""
Test script for the Advanced Multilingual Summarizer API
Run this to test all API endpoints
"""

import requests
import json
import time
from typing import Dict, Any

class APITester:
    def __init__(self, base_url: str = "http://localhost:5000"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
    
    def test_health_check(self) -> bool:
        """Test health check endpoint"""
        print("🔍 Testing health check...")
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Health check passed: {data['message']}")
                print(f"   Supported languages: {len(data['supported_languages'])}")
                return True
            else:
                print(f"❌ Health check failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Health check error: {e}")
            return False
    
    def test_language_detection(self) -> bool:
        """Test language detection endpoint"""
        print("\n🔍 Testing language detection...")
        
        test_texts = [
            ("यह एक हिंदी वाक्य है।", "hi"),
            ("This is an English sentence.", "en"),
            ("এটি একটি বাংলা বাক্য।", "bn"),
            ("இது ஒரு தமிழ் வாக்கியம்.", "ta"),
            ("ఇది ఒక తెలుగు వాక్యం.", "te")
        ]
        
        success_count = 0
        for text, expected_lang in test_texts:
            try:
                response = self.session.post(
                    f"{self.base_url}/api/detect-language",
                    json={"text": text}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    detected = data['detected_language']
                    print(f"✅ Text: '{text[:30]}...' -> Detected: {detected}")
                    success_count += 1
                else:
                    print(f"❌ Detection failed for: {text[:30]}...")
            except Exception as e:
                print(f"❌ Detection error: {e}")
        
        print(f"   Language detection: {success_count}/{len(test_texts)} successful")
        return success_count == len(test_texts)
    
    def test_text_stats(self) -> bool:
        """Test text statistics endpoint"""
        print("\n🔍 Testing text statistics...")
        
        sample_text = """
        भारत एक विविधताओं से भरा देश है। यहाँ अनेक भाषाएँ बोली जाती हैं।
        हिंदी यहाँ की राजभाषा है। भारत की संस्कृति बहुत समृद्ध है।
        यहाँ के लोग अतिथि देवो भव में विश्वास करते हैं।
        """
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/text-stats",
                json={"text": sample_text}
            )
            
            if response.status_code == 200:
                data = response.json()
                stats = data['stats']
                print(f"✅ Text statistics calculated:")
                print(f"   Words: {stats['words']}")
                print(f"   Sentences: {stats['sentences']}")
                print(f"   Characters: {stats['characters']}")
                print(f"   Reading time: {stats['reading_time']} minutes")
                print(f"   Language: {data['language']}")
                print(f"   Keywords: {', '.join(data['keywords'][:5])}")
                return True
            else:
                print(f"❌ Text stats failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Text stats error: {e}")
            return False
    
    def test_summarization(self) -> bool:
        """Test text summarization endpoint"""
        print("\n🔍 Testing text summarization...")
        
        long_text = """
        भारत दुनिया का सबसे बड़ा लोकतंत्र है। यह दक्षिण एशिया में स्थित है और इसकी जनसंख्या 1.4 अरब से अधिक है।
        भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं। यहाँ की राजधानी नई दिल्ली है।
        भारत की अर्थव्यवस्था दुनिया की पांचवीं सबसे बड़ी अर्थव्यवस्था है। यह कृषि, उद्योग और सेवा क्षेत्र में मजबूत है।
        भारत में विविध संस्कृतियाँ, भाषाएँ और धर्म पाए जाते हैं। यहाँ 22 आधिकारिक भाषाएँ हैं।
        भारत का इतिहास बहुत पुराना है। यह सिंधु घाटी सभ्यता का घर था।
        आज भारत तकनीक और नवाचार के क्षेत्र में तेजी से आगे बढ़ रहा है।
        भारत के प्रमुख शहरों में मुंबई, दिल्ली, बैंगलोर, कोलकाता और चेन्नई शामिल हैं।
        यहाँ की शिक्षा प्रणाली में IIT और IIM जैसे प्रतिष्ठित संस्थान हैं।
        """
        
        test_options = [
            {"length": "short", "language": "hi"},
            {"length": "medium", "language": "hi"},
            {"length": "long", "language": "hi"}
        ]
        
        success_count = 0
        for options in test_options:
            try:
                response = self.session.post(
                    f"{self.base_url}/api/summarize",
                    json={"text": long_text, "options": options}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ {options['length'].title()} summary generated:")
                    print(f"   Original words: {data['original_stats']['words']}")
                    print(f"   Summary words: {data['summary_stats']['words']}")
                    print(f"   Compression: {data['compression_ratio']:.2%}")
                    print(f"   Confidence: {data['confidence']:.2%}")
                    print(f"   Keywords: {', '.join(data['keywords'][:3])}")
                    print(f"   Summary: {data['summary'][:100]}...")
                    success_count += 1
                else:
                    print(f"❌ {options['length']} summary failed: {response.status_code}")
            except Exception as e:
                print(f"❌ Summarization error: {e}")
        
        print(f"   Summarization: {success_count}/{len(test_options)} successful")
        return success_count == len(test_options)
    
    def test_keyword_extraction(self) -> bool:
        """Test keyword extraction endpoint"""
        print("\n🔍 Testing keyword extraction...")
        
        sample_text = """
        आर्टिफिशियल इंटेलिजेंस आज के युग की सबसे महत्वपूर्ण तकनीक है।
        मशीन लर्निंग और डीप लर्निंग AI के मुख्य घटक हैं।
        भारत में AI का उपयोग स्वास्थ्य, शिक्षा और कृषि में हो रहा है।
        """
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/keywords",
                json={
                    "text": sample_text,
                    "language": "hi",
                    "num_keywords": 8
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Keywords extracted:")
                print(f"   Language: {data['language']}")
                print(f"   Count: {data['count']}")
                print(f"   Keywords: {', '.join(data['keywords'])}")
                return True
            else:
                print(f"❌ Keyword extraction failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Keyword extraction error: {e}")
            return False
    
    def test_batch_summarization(self) -> bool:
        """Test batch summarization endpoint"""
        print("\n🔍 Testing batch summarization...")
        
        batch_texts = [
            "भारत एक महान देश है। यहाँ की संस्कृति बहुत समृद्ध है। यहाँ अनेक भाषाएँ बोली जाती हैं।",
            "तकनीक आज के युग में बहुत महत्वपूर्ण है। आर्टिफिशियल इंटेलिजेंस का उपयोग बढ़ रहा है।",
            "शिक्षा हर व्यक्ति का मौलिक अधिकार है। भारत में शिक्षा प्रणाली में सुधार हो रहा है।"
        ]
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/batch-summarize",
                json={
                    "texts": batch_texts,
                    "options": {"length": "short", "language": "hi"}
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Batch summarization completed:")
                print(f"   Total processed: {data['total_processed']}")
                
                for i, result in enumerate(data['results']):
                    if 'error' not in result:
                        print(f"   Text {i+1}: {result['summary_stats']['words']} words -> {result['summary'][:50]}...")
                    else:
                        print(f"   Text {i+1}: Error - {result['error']}")
                
                return True
            else:
                print(f"❌ Batch summarization failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Batch summarization error: {e}")
            return False
    
    def test_supported_languages(self) -> bool:
        """Test supported languages endpoint"""
        print("\n🔍 Testing supported languages...")
        
        try:
            response = self.session.get(f"{self.base_url}/api/languages")
            
            if response.status_code == 200:
                data = response.json()
                languages = data['languages']
                print(f"✅ Supported languages retrieved:")
                print(f"   Total languages: {len(languages)}")
                
                for lang in languages[:5]:  # Show first 5
                    print(f"   {lang['code']}: {lang['name']} ({lang['script']})")
                
                if len(languages) > 5:
                    print(f"   ... and {len(languages) - 5} more")
                
                return True
            else:
                print(f"❌ Languages endpoint failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Languages endpoint error: {e}")
            return False
    
    def run_all_tests(self) -> Dict[str, bool]:
        """Run all API tests"""
        print("🚀 Starting API Tests for Advanced Multilingual Summarizer")
        print("=" * 60)
        
        tests = {
            "Health Check": self.test_health_check,
            "Language Detection": self.test_language_detection,
            "Text Statistics": self.test_text_stats,
            "Summarization": self.test_summarization,
            "Keyword Extraction": self.test_keyword_extraction,
            "Batch Summarization": self.test_batch_summarization,
            "Supported Languages": self.test_supported_languages
        }
        
        results = {}
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests.items():
            try:
                result = test_func()
                results[test_name] = result
                if result:
                    passed += 1
            except Exception as e:
                print(f"❌ {test_name} failed with exception: {e}")
                results[test_name] = False
        
        print("\n" + "=" * 60)
        print("📊 Test Results Summary:")
        print(f"   Passed: {passed}/{total}")
        print(f"   Success Rate: {passed/total:.1%}")
        
        for test_name, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"   {test_name}: {status}")
        
        if passed == total:
            print("\n🎉 All tests passed! API is working correctly.")
        else:
            print(f"\n⚠️  {total - passed} test(s) failed. Please check the API server.")
        
        return results

def main():
    """Main function to run API tests"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Test the Advanced Multilingual Summarizer API")
    parser.add_argument("--url", default="http://localhost:5000", help="API base URL")
    parser.add_argument("--test", help="Run specific test (health, language, stats, summarize, keywords, batch, languages)")
    
    args = parser.parse_args()
    
    tester = APITester(args.url)
    
    if args.test:
        test_methods = {
            "health": tester.test_health_check,
            "language": tester.test_language_detection,
            "stats": tester.test_text_stats,
            "summarize": tester.test_summarization,
            "keywords": tester.test_keyword_extraction,
            "batch": tester.test_batch_summarization,
            "languages": tester.test_supported_languages
        }
        
        if args.test in test_methods:
            print(f"Running {args.test} test...")
            result = test_methods[args.test]()
            print(f"Test result: {'PASS' if result else 'FAIL'}")
        else:
            print(f"Unknown test: {args.test}")
            print(f"Available tests: {', '.join(test_methods.keys())}")
    else:
        tester.run_all_tests()

if __name__ == "__main__":
    main()