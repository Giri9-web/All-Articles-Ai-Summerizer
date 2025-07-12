import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { helpArticles } from '../data/helpArticles';

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const categories = ['All', 'Getting Started', 'Advanced Features', 'Account', 'Social Features', 'Troubleshooting'];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedArticleData = selectedArticle ? helpArticles.find(a => a.id === selectedArticle) : null;

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
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Help Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of Summarizer
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
          </div>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start Chat
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">Send us your questions via email</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Send Email
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">Call us for urgent assistance</p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Call Now
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Book className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedArticleData ? (
              /* Article View */
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
                >
                  ← Back to articles
                </button>
                
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedArticleData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {selectedArticleData.category}
                    </span>
                    <span>Last updated: {selectedArticleData.lastUpdated.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {selectedArticleData.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticleData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Articles List */
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                  </h2>
                  <span className="text-gray-600">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                  </span>
                </motion.div>

                <div className="grid gap-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedArticle(article.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                              {article.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {article.lastUpdated.toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2">
                            {article.content.substring(0, 150)}...
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredArticles.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}