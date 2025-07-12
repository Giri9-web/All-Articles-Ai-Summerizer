import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, Trophy, Zap } from 'lucide-react';
import { comparisonFeatures } from '../data/comparisonData';

export function Compare() {
  const competitors = [
    { name: 'Summarizer', color: 'bg-blue-600', highlight: true },
    { name: 'Competitor A', color: 'bg-gray-500', highlight: false },
    { name: 'Competitor B', color: 'bg-gray-500', highlight: false },
    { name: 'Competitor C', color: 'bg-gray-500', highlight: false },
  ];

  const renderFeatureValue = (value: boolean | string, isOurs: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className={`w-5 h-5 ${isOurs ? 'text-blue-600' : 'text-green-600'}`} />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      );
    }
    return (
      <span className={`text-sm font-medium ${isOurs ? 'text-blue-600' : 'text-gray-700'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Summarizer is the Best Choice
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Summarizer compares to other text summarization tools. 
            We lead in multilingual support, AI technology, and user experience.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
            <Star className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">22+ Languages</h3>
            <p className="opacity-90">Most comprehensive Indian language support</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-2xl">
            <Zap className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Advanced AI</h3>
            <p className="opacity-90">Hybrid extractive + abstractive technology</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-2xl">
            <CheckCircle className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Social Features</h3>
            <p className="opacity-90">Only platform with community engagement</p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4">
              <div className="font-semibold text-gray-900">Features</div>
              {competitors.map((competitor, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${competitor.color}`}>
                    {competitor.name}
                  </div>
                  {competitor.highlight && (
                    <div className="flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-600 ml-1">Best Choice</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {comparisonFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="font-medium text-gray-900">{feature.feature}</div>
                  <div className="text-center">
                    {renderFeatureValue(feature.ourApp, true)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.competitor1)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.competitor2)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.competitor3)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of users who have switched to Summarizer for superior multilingual text summarization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200">
                Try Free Now
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}