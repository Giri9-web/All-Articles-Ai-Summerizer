import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Globe, Users, Shield, Sparkles } from 'lucide-react';
import { AdvancedSummarizer } from '../components/Summarizer/AdvancedSummarizer';

export function Home() {
  const features = [
    {
      icon: Globe,
      title: '22+ Indian Languages',
      description: 'Support for all major Indian languages including Hindi, Bengali, Telugu, Tamil, and more'
    },
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Hybrid extractive and abstractive summarization with high accuracy and context understanding'
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Like, comment, and share summaries with the community. Build connections through content'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate summaries in under 2 seconds with our optimized AI processing pipeline'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and secure. GDPR compliant with local processing options'
    },
    {
      icon: Sparkles,
      title: 'Smart Analysis',
      description: 'Keyword extraction, confidence scoring, and detailed text analytics for better insights'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Summarizer
                </h1>
                <p className="text-lg text-gray-600 mt-2">Advanced AI for Indian Languages</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Transform lengthy texts into concise, meaningful summaries with our advanced AI technology. 
              Supporting 22+ Indian languages with social features and intelligent analysis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>22+ Languages</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>&lt; 2s Processing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Users className="w-4 h-4 text-green-600" />
                <span>Social Features</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Privacy First</span>
              </div>
            </motion.div>
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
                Why Choose Summarizer?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the most advanced multilingual text summarization platform designed specifically for Indian languages and content.
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
          <AdvancedSummarizer />
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Experience the Future of Text Summarization?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who trust Summarizer for their daily text processing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                  View Pricing
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}