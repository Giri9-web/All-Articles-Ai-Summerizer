import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ComparisonFeature {
  feature: string;
  bharatSummarizer: string | boolean;
  competitor1: string | boolean;
  competitor2: string | boolean;
  competitor3: string | boolean;
  category: string;
  importance: 'high' | 'medium' | 'low';
}

const CompareScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Features', icon: 'grid-outline' },
    { id: 'languages', name: 'Languages', icon: 'globe-outline' },
    { id: 'ai', name: 'AI Technology', icon: 'brain-outline' },
    { id: 'features', name: 'Features', icon: 'star-outline' },
    { id: 'performance', name: 'Performance', icon: 'speedometer-outline' },
    { id: 'pricing', name: 'Pricing', icon: 'card-outline' },
  ];

  const competitors = [
    { 
      name: 'BharatSummarizer', 
      color: '#3B82F6', 
      logo: 'brain',
      highlight: true,
      description: 'Advanced AI for Indian Languages'
    },
    { 
      name: 'SummarizeBot', 
      color: '#6B7280', 
      logo: 'robot',
      highlight: false,
      description: 'Basic text summarization'
    },
    { 
      name: 'TextSummarizer', 
      color: '#6B7280', 
      logo: 'document',
      highlight: false,
      description: 'Simple summarization tool'
    },
    { 
      name: 'QuickSummary', 
      color: '#6B7280', 
      logo: 'flash',
      highlight: false,
      description: 'Fast text processing'
    },
  ];

  const comparisonData: ComparisonFeature[] = [
    // Language Support
    {
      feature: 'Indian Languages Supported',
      bharatSummarizer: '22+ Languages',
      competitor1: '3 Languages',
      competitor2: '1 Language',
      competitor3: '5 Languages',
      category: 'languages',
      importance: 'high'
    },
    {
      feature: 'Native Script Support',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: false,
      competitor3: true,
      category: 'languages',
      importance: 'high'
    },
    {
      feature: 'RTL Language Support',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: false,
      competitor3: false,
      category: 'languages',
      importance: 'medium'
    },
    {
      feature: 'Auto Language Detection',
      bharatSummarizer: true,
      competitor1: true,
      competitor2: false,
      competitor3: true,
      category: 'languages',
      importance: 'medium'
    },

    // AI Technology
    {
      feature: 'AI Algorithm Type',
      bharatSummarizer: 'Hybrid (Extractive + Abstractive)',
      competitor1: 'Basic Extractive',
      competitor2: 'Rule-based',
      competitor3: 'Basic Extractive',
      category: 'ai',
      importance: 'high'
    },
    {
      feature: 'Machine Learning Backend',
      bharatSummarizer: 'Python + Advanced NLP',
      competitor1: 'Basic NLP',
      competitor2: 'No ML',
      competitor3: 'Basic ML',
      category: 'ai',
      importance: 'high'
    },
    {
      feature: 'Confidence Scoring',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: false,
      competitor3: true,
      category: 'ai',
      importance: 'medium'
    },
    {
      feature: 'Context Understanding',
      bharatSummarizer: 'Advanced',
      competitor1: 'Basic',
      competitor2: 'None',
      competitor3: 'Basic',
      category: 'ai',
      importance: 'high'
    },

    // Features
    {
      feature: 'Social Features',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: false,
      competitor3: false,
      category: 'features',
      importance: 'medium'
    },
    {
      feature: 'User Authentication',
      bharatSummarizer: 'Email + Guest Mode',
      competitor1: 'Email Only',
      competitor2: false,
      competitor3: 'Social Login Only',
      category: 'features',
      importance: 'medium'
    },
    {
      feature: 'Summary Customization',
      bharatSummarizer: '3 Lengths + Advanced Options',
      competitor1: '2 Lengths',
      competitor2: 'Fixed Length',
      competitor3: '2 Lengths',
      category: 'features',
      importance: 'high'
    },
    {
      feature: 'Keyword Extraction',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: true,
      competitor3: false,
      category: 'features',
      importance: 'medium'
    },
    {
      feature: 'Batch Processing',
      bharatSummarizer: true,
      competitor1: false,
      competitor2: false,
      competitor3: true,
      category: 'features',
      importance: 'medium'
    },
    {
      feature: 'Export Options',
      bharatSummarizer: 'PDF, Word, Text, JSON',
      competitor1: 'Text Only',
      competitor2: 'PDF, Text',
      competitor3: 'Text Only',
      category: 'features',
      importance: 'medium'
    },

    // Performance
    {
      feature: 'Processing Speed',
      bharatSummarizer: '< 2 seconds',
      competitor1: '5-10 seconds',
      competitor2: '10-15 seconds',
      competitor3: '3-5 seconds',
      category: 'performance',
      importance: 'high'
    },
    {
      feature: 'Accuracy Rate',
      bharatSummarizer: '95%+',
      competitor1: '80%',
      competitor2: '70%',
      competitor3: '85%',
      category: 'performance',
      importance: 'high'
    },
    {
      feature: 'Uptime Guarantee',
      bharatSummarizer: '99.9%',
      competitor1: '99%',
      competitor2: '95%',
      competitor3: '98%',
      category: 'performance',
      importance: 'medium'
    },
    {
      feature: 'Mobile App Performance',
      bharatSummarizer: 'Optimized',
      competitor1: 'Basic',
      competitor2: 'No Mobile App',
      competitor3: 'Basic',
      category: 'performance',
      importance: 'medium'
    },

    // Pricing
    {
      feature: 'Free Tier',
      bharatSummarizer: 'Generous Limits',
      competitor1: 'Limited',
      competitor2: 'With Ads',
      competitor3: 'Very Limited',
      category: 'pricing',
      importance: 'high'
    },
    {
      feature: 'Premium Pricing',
      bharatSummarizer: '$9.99/month',
      competitor1: '$19.99/month',
      competitor2: '$14.99/month',
      competitor3: '$24.99/month',
      category: 'pricing',
      importance: 'high'
    },
    {
      feature: 'Enterprise Solutions',
      bharatSummarizer: true,
      competitor1: true,
      competitor2: false,
      competitor3: false,
      category: 'pricing',
      importance: 'low'
    },
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? comparisonData 
    : comparisonData.filter(item => item.category === selectedCategory);

  const renderFeatureValue = (value: string | boolean, isOurs: boolean = false) => {
    if (typeof value === 'boolean') {
      return (
        <View style={styles.booleanValue}>
          <Ionicons 
            name={value ? 'checkmark-circle' : 'close-circle'} 
            size={20} 
            color={value ? (isOurs ? '#3B82F6' : '#10B981') : '#EF4444'} 
          />
        </View>
      );
    }
    return (
      <Text style={[
        styles.featureValue,
        isOurs && styles.featureValueHighlight
      ]}>
        {value}
      </Text>
    );
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleFeaturePress = (feature: string) => {
    setShowDetails(showDetails === feature ? null : feature);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Feature Comparison</Text>
        <Text style={styles.headerSubtitle}>
          See why BharatSummarizer leads the market
        </Text>
      </LinearGradient>

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
              size={20} 
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

      {/* Competitors Header */}
      <View style={styles.competitorsHeader}>
        <View style={styles.featureColumn}>
          <Text style={styles.columnTitle}>Features</Text>
        </View>
        {competitors.map((competitor, index) => (
          <View key={index} style={styles.competitorColumn}>
            <View style={[
              styles.competitorLogo,
              { backgroundColor: competitor.color }
            ]}>
              <Ionicons name={competitor.logo as any} size={16} color="#FFFFFF" />
            </View>
            <Text style={[
              styles.competitorName,
              competitor.highlight && styles.competitorNameHighlight
            ]}>
              {competitor.name}
            </Text>
            {competitor.highlight && (
              <View style={styles.bestChoiceBadge}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.bestChoiceText}>Best Choice</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Comparison Table */}
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {filteredFeatures.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureRow}
            onPress={() => handleFeaturePress(feature.feature)}
            activeOpacity={0.7}
          >
            <View style={styles.featureColumn}>
              <View style={styles.featureInfo}>
                <Text style={styles.featureName}>{feature.feature}</Text>
                <View style={[
                  styles.importanceBadge,
                  { backgroundColor: getImportanceColor(feature.importance) }
                ]}>
                  <Text style={styles.importanceText}>
                    {feature.importance.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.competitorColumn}>
              {renderFeatureValue(feature.bharatSummarizer, true)}
            </View>
            <View style={styles.competitorColumn}>
              {renderFeatureValue(feature.competitor1)}
            </View>
            <View style={styles.competitorColumn}>
              {renderFeatureValue(feature.competitor2)}
            </View>
            <View style={styles.competitorColumn}>
              {renderFeatureValue(feature.competitor3)}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Summary Stats */}
      <View style={styles.summaryStats}>
        <LinearGradient
          colors={['#10B981', '#3B82F6']}
          style={styles.statsGradient}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>22+</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>95%+</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2s</Text>
            <Text style={styles.statLabel}>Speed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>#1</Text>
            <Text style={styles.statLabel}>Choice</Text>
          </View>
        </LinearGradient>
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
  competitorsHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 16,
  },
  featureColumn: {
    flex: 2,
    paddingHorizontal: 16,
  },
  competitorColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  competitorLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  competitorName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  competitorNameHighlight: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  bestChoiceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  bestChoiceText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '500',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  featureRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 16,
    alignItems: 'center',
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  importanceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  importanceText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featureValue: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  featureValueHighlight: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  booleanValue: {
    alignItems: 'center',
  },
  summaryStats: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statsGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E7EB',
  },
});

export default CompareScreen;