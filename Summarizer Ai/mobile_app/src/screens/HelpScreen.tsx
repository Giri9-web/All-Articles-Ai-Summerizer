import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: 'grid-outline' },
    { id: 'getting-started', name: 'Getting Started', icon: 'play-outline' },
    { id: 'features', name: 'Features', icon: 'star-outline' },
    { id: 'languages', name: 'Languages', icon: 'globe-outline' },
    { id: 'account', name: 'Account', icon: 'person-outline' },
    { id: 'troubleshooting', name: 'Issues', icon: 'warning-outline' },
  ];

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I get started with BharatSummarizer?',
      answer: 'Simply paste your text in the input area, select your language, choose summary length, and tap "Generate Summary". You can use the app as a guest or create an account for additional features.',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'Which languages are supported?',
      answer: 'We support 22+ Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Urdu, Punjabi, Odia, Assamese, and more. English is also fully supported.',
      category: 'languages'
    },
    {
      id: '3',
      question: 'How accurate are the summaries?',
      answer: 'Our AI achieves 95%+ accuracy using advanced hybrid algorithms that combine extractive and abstractive techniques. The accuracy varies based on text quality and language.',
      category: 'features'
    },
    {
      id: '4',
      question: 'Can I use the app offline?',
      answer: 'Basic summarization features work offline for previously processed languages. However, for best results and all features, an internet connection is recommended.',
      category: 'features'
    },
    {
      id: '5',
      question: 'How do I change the default language?',
      answer: 'Go to Settings > Default Language and select your preferred language. You can also change the language for each summary individually.',
      category: 'account'
    },
    {
      id: '6',
      question: 'Why is my summary not generating?',
      answer: 'Ensure your text has at least 10 words, check your internet connection, and verify the selected language matches your text. Try refreshing the app if issues persist.',
      category: 'troubleshooting'
    },
    {
      id: '7',
      question: 'How do I save my summaries?',
      answer: 'Summaries are automatically saved to your history when you have an account. You can also copy or share summaries directly from the app.',
      category: 'features'
    },
    {
      id: '8',
      question: 'What makes BharatSummarizer different?',
      answer: 'We specialize in Indian languages with native script support, advanced AI algorithms, social features, and the most comprehensive language coverage in the market.',
      category: 'features'
    },
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: 'chatbubble-outline',
      color: '#3B82F6',
      action: () => {},
    },
    {
      title: 'Email Support',
      description: 'Send us your questions via email',
      icon: 'mail-outline',
      color: '#10B981',
      action: () => Linking.openURL('mailto:support@bharatsummarizer.com'),
    },
    {
      title: 'Phone Support',
      description: 'Call us for urgent assistance',
      icon: 'call-outline',
      color: '#8B5CF6',
      action: () => Linking.openURL('tel:+911234567890'),
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: 'people-outline',
      color: '#F59E0B',
      action: () => {},
    },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFAQPress = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Help Center</Text>
        <Text style={styles.headerSubtitle}>
          Find answers and get support
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search help articles..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Contact</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={[styles.contactIcon, { backgroundColor: option.color }]}>
                  <Ionicons name={option.icon as any} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={18} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Frequently Asked Questions ({filteredFAQs.length})
          </Text>
          
          {filteredFAQs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => handleFAQPress(faq.id)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color="#6B7280" 
                />
              </View>
              
              {expandedFAQ === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {filteredFAQs.length === 0 && (
            <View style={styles.noResults}>
              <Ionicons name="search" size={48} color="#D1D5DB" />
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search terms or browse different categories
              </Text>
            </View>
          )}
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          
          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <Ionicons name="book-outline" size={24} color="#3B82F6" />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>User Guide</Text>
              <Text style={styles.resourceDescription}>
                Complete guide to using BharatSummarizer
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <Ionicons name="play-circle-outline" size={24} color="#10B981" />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Video Tutorials</Text>
              <Text style={styles.resourceDescription}>
                Watch step-by-step tutorials
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem} activeOpacity={0.7}>
            <Ionicons name="code-outline" size={24} color="#8B5CF6" />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>API Documentation</Text>
              <Text style={styles.resourceDescription}>
                Developer resources and API docs
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  categoryContainer: {
    paddingRight: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    paddingTop: 12,
  },
  noResults: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resourceContent: {
    flex: 1,
    marginLeft: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default HelpScreen;