import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Globe, Users, Shield, Sparkles, Server, Code } from 'lucide-react';
import { PythonSummarizer } from '../components/Summarizer/PythonSummarizer';

export function PythonHome() {
  const features = [
    {
      icon: Server,
      title: 'Python AI Backend',
      description: 'Advanced machine learning algorithms with NLTK, scikit-learn, and custom NLP models'
    },
    {
      icon: Globe,
      title: '22+ Indian Languages',
      description: 'Native support for all major Indian languages with script-specific processing'
    },
    {
      icon: Brain,
      title: 'Hybrid AI Technology',
      description: 'Combines extractive and abstractive summarization with TF-IDF and neural approaches'
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Like, comment, and share summaries with the community. Build connections through content'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized Python processing with batch support and intelligent caching'
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'Production-grade API with rate limiting, security, and comprehensive error handling'
    }
  ];

  const pythonFeatures = [
    {
      title: 'Advanced NLP Libraries',
      description: 'NLTK, TextStat, LangDetect, scikit-learn',
      icon: Code
    },
    {
      title: 'Machine Learning',
      description: 'TF-IDF vectorization, cosine similarity, neural networks',
      icon: Brain
    },
    {
      title: 'Language Processing',
      description: 'Script detection, tokenization, stemming, stop-word removal',
      icon: Globe
    },
    {
      title: 'Performance Optimization',
      description: 'Batch processing, caching, async operations',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-green-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="text-center py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl shadow-xl">
                <Server className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Summarizer AI
                </h1>
                <p className="text-lg text-gray-600 mt-2">Advanced Machine Learning for Text Summarization</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Experience the power of Python-based AI with advanced NLP libraries, machine learning algorithms, 
              and enterprise-grade processing for superior multilingual text summarization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Server className="w-4 h-4 text-green-600" />
                <span>Python Backend</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Brain className="w-4 h-4 text-blue-600" />
                <span>ML Algorithms</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>22+ Languages</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>Enterprise Grade</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Python Features Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powered by Advanced Python Technologies
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Our Python backend leverages cutting-edge machine learning libraries and algorithms 
                for superior text processing and summarization capabilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pythonFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="p-3 bg-white/20 rounded-xl w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="opacity-90 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Python AI Backend?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the most advanced multilingual text summarization platform with enterprise-grade 
                Python backend and state-of-the-art machine learning algorithms.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Summarizer */}
        <section className="py-16 px-4">
          <PythonSummarizer />
        </section>

        {/* Technical Specifications */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Technical Specifications
              </h2>
              <p className="text-lg text-gray-600">
                Built with industry-standard Python libraries and frameworks
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Libraries</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Flask:</strong> Web framework and API server</li>
                  <li>• <strong>NLTK:</strong> Natural language processing toolkit</li>
                  <li>• <strong>scikit-learn:</strong> Machine learning algorithms</li>
                  <li>• <strong>NumPy:</strong> Numerical computing</li>
                  <li>• <strong>LangDetect:</strong> Language identification</li>
                  <li>• <strong>TextStat:</strong> Text readability metrics</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">API Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>RESTful API:</strong> Standard HTTP endpoints</li>
                  <li>• <strong>CORS Support:</strong> Cross-origin requests</li>
                  <li>• <strong>Rate Limiting:</strong> Request throttling</li>
                  <li>• <strong>Error Handling:</strong> Comprehensive error responses</li>
                  <li>• <strong>Batch Processing:</strong> Multiple text summarization</li>
                  <li>• <strong>Health Monitoring:</strong> System status endpoints</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience Python-Powered AI?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get started with our advanced Python backend for superior multilingual text summarization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                  Start Summarizing
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                  View Documentation
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}