import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface Language {
  code: string;
  name: string;
  native: string;
  script: string;
  family: string;
  speakers: string;
  region: string;
}

const LanguageMenuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onLanguageSelect, selectedLanguage } = route.params as any;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const languages: Language[] = [
    { 
      code: 'hi', 
      name: 'Hindi', 
      native: 'हिन्दी', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '600M+',
      region: 'North India'
    },
    { 
      code: 'en', 
      name: 'English', 
      native: 'English', 
      script: 'Latin', 
      family: 'Germanic',
      speakers: '1.5B+',
      region: 'Global'
    },
    { 
      code: 'bn', 
      name: 'Bengali', 
      native: 'বাংলা', 
      script: 'Bengali', 
      family: 'Indo-Aryan',
      speakers: '300M+',
      region: 'Bengal'
    },
    { 
      code: 'te', 
      name: 'Telugu', 
      native: 'తెలుగు', 
      script: 'Telugu', 
      family: 'Dravidian',
      speakers: '95M+',
      region: 'Andhra Pradesh'
    },
    { 
      code: 'mr', 
      name: 'Marathi', 
      native: 'मराठी', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '83M+',
      region: 'Maharashtra'
    },
    { 
      code: 'ta', 
      name: 'Tamil', 
      native: 'தமிழ்', 
      script: 'Tamil', 
      family: 'Dravidian',
      speakers: '78M+',
      region: 'Tamil Nadu'
    },
    { 
      code: 'ur', 
      name: 'Urdu', 
      native: 'اردو', 
      script: 'Arabic', 
      family: 'Indo-Aryan',
      speakers: '70M+',
      region: 'Pakistan/India'
    },
    { 
      code: 'gu', 
      name: 'Gujarati', 
      native: 'ગુજરાતી', 
      script: 'Gujarati', 
      family: 'Indo-Aryan',
      speakers: '56M+',
      region: 'Gujarat'
    },
    { 
      code: 'kn', 
      name: 'Kannada', 
      native: 'ಕನ್ನಡ', 
      script: 'Kannada', 
      family: 'Dravidian',
      speakers: '44M+',
      region: 'Karnataka'
    },
    { 
      code: 'ml', 
      name: 'Malayalam', 
      native: 'മലയാളം', 
      script: 'Malayalam', 
      family: 'Dravidian',
      speakers: '38M+',
      region: 'Kerala'
    },
    { 
      code: 'or', 
      name: 'Odia', 
      native: 'ଓଡ଼ିଆ', 
      script: 'Odia', 
      family: 'Indo-Aryan',
      speakers: '38M+',
      region: 'Odisha'
    },
    { 
      code: 'pa', 
      name: 'Punjabi', 
      native: 'ਪੰਜਾਬੀ', 
      script: 'Gurmukhi', 
      family: 'Indo-Aryan',
      speakers: '33M+',
      region: 'Punjab'
    },
    { 
      code: 'as', 
      name: 'Assamese', 
      native: 'অসমীয়া', 
      script: 'Bengali', 
      family: 'Indo-Aryan',
      speakers: '15M+',
      region: 'Assam'
    },
    { 
      code: 'mai', 
      name: 'Maithili', 
      native: 'मैथिली', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '13M+',
      region: 'Bihar'
    },
    { 
      code: 'sa', 
      name: 'Sanskrit', 
      native: 'संस्कृतम्', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '25K+',
      region: 'Ancient India'
    },
    { 
      code: 'ne', 
      name: 'Nepali', 
      native: 'नेपाली', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '16M+',
      region: 'Nepal'
    },
    { 
      code: 'ks', 
      name: 'Kashmiri', 
      native: 'कॉशुर', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '7M+',
      region: 'Kashmir'
    },
    { 
      code: 'sd', 
      name: 'Sindhi', 
      native: 'سنڌي', 
      script: 'Arabic', 
      family: 'Indo-Aryan',
      speakers: '25M+',
      region: 'Sindh'
    },
    { 
      code: 'doi', 
      name: 'Dogri', 
      native: 'डोगरी', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '2M+',
      region: 'Jammu'
    },
    { 
      code: 'mni', 
      name: 'Manipuri', 
      native: 'মৈতৈলোন্', 
      script: 'Bengali', 
      family: 'Sino-Tibetan',
      speakers: '1.8M+',
      region: 'Manipur'
    },
    { 
      code: 'sat', 
      name: 'Santali', 
      native: 'ᱥᱟᱱᱛᱟᱲᱤ', 
      script: 'Ol Chiki', 
      family: 'Austroasiatic',
      speakers: '7M+',
      region: 'Jharkhand'
    },
    { 
      code: 'kok', 
      name: 'Konkani', 
      native: 'कोंकणी', 
      script: 'Devanagari', 
      family: 'Indo-Aryan',
      speakers: '2.3M+',
      region: 'Goa'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Languages', icon: 'globe-outline' },
    { id: 'popular', name: 'Most Popular', icon: 'star-outline' },
    { id: 'indo-aryan', name: 'Indo-Aryan', icon: 'library-outline' },
    { id: 'dravidian', name: 'Dravidian', icon: 'book-outline' },
    { id: 'others', name: 'Others', icon: 'ellipsis-horizontal-outline' },
  ];

  const getFilteredLanguages = () => {
    let filtered = languages;

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'popular') {
        filtered = languages.filter(lang => 
          ['hi', 'en', 'bn', 'te', 'mr', 'ta', 'gu', 'kn'].includes(lang.code)
        );
      } else if (selectedCategory === 'indo-aryan') {
        filtered = languages.filter(lang => lang.family === 'Indo-Aryan');
      } else if (selectedCategory === 'dravidian') {
        filtered = languages.filter(lang => lang.family === 'Dravidian');
      } else if (selectedCategory === 'others') {
        filtered = languages.filter(lang => 
          !['Indo-Aryan', 'Dravidian'].includes(lang.family)
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.native.includes(searchQuery) ||
        lang.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleLanguageSelect = (language: Language) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLanguageSelect(language);
    navigation.goBack();
  };

  const filteredLanguages = getFilteredLanguages();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Select Language</Text>
            <Text style={styles.headerSubtitle}>Choose your preferred language</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages..."
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

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
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

      {/* Languages List */}
      <ScrollView style={styles.languagesList} showsVerticalScrollIndicator={false}>
        {filteredLanguages.map((language, index) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageItem,
              selectedLanguage === language.code && styles.languageItemSelected
            ]}
            onPress={() => handleLanguageSelect(language)}
            activeOpacity={0.7}
          >
            <View style={styles.languageInfo}>
              <View style={styles.languageHeader}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNative}>{language.native}</Text>
                {selectedLanguage === language.code && (
                  <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                )}
              </View>
              <View style={styles.languageDetails}>
                <View style={styles.languageTag}>
                  <Text style={styles.languageTagText}>{language.script}</Text>
                </View>
                <View style={styles.languageTag}>
                  <Text style={styles.languageTagText}>{language.family}</Text>
                </View>
              </View>
              <View style={styles.languageStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={14} color="#6B7280" />
                  <Text style={styles.statText}>{language.speakers}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  <Text style={styles.statText}>{language.region}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {filteredLanguages.length} languages available
        </Text>
        <Text style={styles.footerSubtext}>
          More languages coming soon!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  searchContainer: {
    padding: 16,
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
  categoryScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  languagesList: {
    flex: 1,
    padding: 16,
  },
  languageItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageItemSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  languageInfo: {
    flex: 1,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  languageNative: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  languageDetails: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  languageTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  languageTagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  languageStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default LanguageMenuScreen;