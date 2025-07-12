import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SummarizerScreen = () => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी'
  });
  const [summaryLength, setSummaryLength] = useState('medium');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [preserveFormatting, setPreserveFormatting] = useState(false);
  const [includeKeywords, setIncludeKeywords] = useState(true);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '~25% of original', icon: 'flash' },
    { value: 'medium', label: 'Medium', description: '~40% of original', icon: 'speedometer' },
    { value: 'long', label: 'Long', description: '~60% of original', icon: 'document' },
  ];

  const getTextStats = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);
    
    return { words, characters, sentences, readingTime };
  };

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const openLanguageMenu = () => {
    navigation.navigate('LanguageMenu' as never, {
      onLanguageSelect: handleLanguageSelect,
      selectedLanguage: selectedLanguage.code,
    } as never);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to summarize');
      return;
    }

    const stats = getTextStats(inputText);
    if (stats.words < 10) {
      Alert.alert('Error', 'Please enter at least 10 words for better summarization');
      return;
    }

    setIsProcessing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      // Simulate API call to Python backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock summarization logic
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const targetSentences = Math.max(1, Math.floor(
        sentences.length * (
          summaryLength === 'short' ? 0.25 :
          summaryLength === 'medium' ? 0.4 : 0.6
        )
      ));
      
      const mockSummary = sentences.slice(0, targetSentences).join('. ') + '.';
      setSummary(mockSummary);
      
      // Scroll to summary
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate summary. Please try again.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (summary) {
      await Clipboard.setStringAsync(summary);
      Alert.alert('Success', 'Summary copied to clipboard!');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleShare = async () => {
    if (summary) {
      try {
        await Sharing.shareAsync(summary);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const inputStats = getTextStats(inputText);
  const summaryStats = getTextStats(summary);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Selector - Hidden in Menu */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Language & Settings</Text>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={openLanguageMenu}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.languageSelector}
            onPress={openLanguageMenu}
            activeOpacity={0.7}
          >
            <View style={styles.languageInfo}>
              <Ionicons name="globe" size={20} color="#3B82F6" />
              <View style={styles.languageText}>
                <Text style={styles.languageName}>{selectedLanguage.name}</Text>
                <Text style={styles.languageNative}>{selectedLanguage.native}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Summary Length */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary Length</Text>
          <View style={styles.lengthOptions}>
            {lengthOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.lengthOption,
                  summaryLength === option.value && styles.lengthOptionActive
                ]}
                onPress={() => setSummaryLength(option.value)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={option.icon as any} 
                  size={20} 
                  color={summaryLength === option.value ? '#3B82F6' : '#6B7280'} 
                />
                <View style={styles.lengthText}>
                  <Text style={[
                    styles.lengthLabel,
                    summaryLength === option.value && styles.lengthLabelActive
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.lengthDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Advanced Options */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.advancedToggle}
            onPress={() => setShowAdvancedOptions(!showAdvancedOptions)}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Advanced Options</Text>
            <Ionicons 
              name={showAdvancedOptions ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          
          {showAdvancedOptions && (
            <View style={styles.advancedOptions}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setPreserveFormatting(!preserveFormatting)}
                activeOpacity={0.7}
              >
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>Preserve Formatting</Text>
                  <Text style={styles.optionDescription}>
                    Maintain original text structure
                  </Text>
                </View>
                <View style={[
                  styles.toggle,
                  preserveFormatting && styles.toggleActive
                ]}>
                  {preserveFormatting && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setIncludeKeywords(!includeKeywords)}
                activeOpacity={0.7}
              >
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>Extract Keywords</Text>
                  <Text style={styles.optionDescription}>
                    Identify key topics and terms
                  </Text>
                </View>
                <View style={[
                  styles.toggle,
                  includeKeywords && styles.toggleActive
                ]}>
                  {includeKeywords && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Text Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Text</Text>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter your text here to generate a summary..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
            
            {/* Text Stats */}
            <View style={styles.textStats}>
              <View style={styles.statItem}>
                <Ionicons name="text" size={16} color="#6B7280" />
                <Text style={styles.statText}>{inputStats.words} words</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text style={styles.statText}>{inputStats.readingTime}m read</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="document" size={16} color="#6B7280" />
                <Text style={styles.statText}>{inputStats.sentences} sentences</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[styles.generateButton, (!inputText.trim() || isProcessing) && styles.generateButtonDisabled]}
          onPress={handleSummarize}
          disabled={!inputText.trim() || isProcessing}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={(!inputText.trim() || isProcessing) ? ['#9CA3AF', '#6B7280'] : ['#3B82F6', '#1D4ED8']}
            style={styles.generateGradient}
          >
            {isProcessing ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.generateText}>Processing with AI...</Text>
              </>
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                <Text style={styles.generateText}>Generate AI Summary</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Summary Output */}
        {summary && (
          <View style={styles.section}>
            <View style={styles.summaryHeader}>
              <Text style={styles.sectionTitle}>AI Summary</Text>
              <View style={styles.summaryActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCopy}
                  activeOpacity={0.7}
                >
                  <Ionicons name="copy" size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleShare}
                  activeOpacity={0.7}
                >
                  <Ionicons name="share" size={20} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>{summary}</Text>
              
              {/* Summary Stats */}
              <View style={styles.summaryStats}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{summaryStats.words}</Text>
                  <Text style={styles.statLabel}>Words</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{summaryStats.sentences}</Text>
                  <Text style={styles.statLabel}>Sentences</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>
                    {Math.round((1 - summaryStats.words / inputStats.words) * 100)}%
                  </Text>
                  <Text style={styles.statLabel}>Reduced</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>95%</Text>
                  <Text style={styles.statLabel}>Accuracy</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Comparison CTA */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={() => navigation.navigate('Compare' as never)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.compareGradient}
            >
              <Ionicons name="analytics" size={24} color="#FFFFFF" />
              <View style={styles.compareContent}>
                <Text style={styles.compareTitle}>Compare with Others</Text>
                <Text style={styles.compareSubtitle}>
                  See why we're the best choice for multilingual summarization
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  languageNative: {
    fontSize: 14,
    color: '#6B7280',
  },
  lengthOptions: {
    gap: 12,
  },
  lengthOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  lengthOptionActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  lengthText: {
    flex: 1,
  },
  lengthLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  lengthLabelActive: {
    color: '#3B82F6',
  },
  lengthDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  advancedToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  advancedOptions: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  textInput: {
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 120,
    maxHeight: 200,
  },
  textStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  generateButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  generateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  summaryText: {
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  summaryStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  compareButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  compareGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  compareContent: {
    flex: 1,
  },
  compareTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  compareSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
  },
});

export default SummarizerScreen;