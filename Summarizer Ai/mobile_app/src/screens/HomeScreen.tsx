import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const [currentLanguage, setCurrentLanguage] = useState(0);
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const languages = [
    { name: 'Hindi', native: 'हिन्दी', code: 'hi' },
    { name: 'Bengali', native: 'বাংলা', code: 'bn' },
    { name: 'Telugu', native: 'తెలుగు', code: 'te' },
    { name: 'Tamil', native: 'தமிழ்', code: 'ta' },
    { name: 'Marathi', native: 'मराठी', code: 'mr' },
  ];

  const features = [
    {
      icon: 'globe-outline',
      title: '22+ Languages',
      description: 'Support for all major Indian languages',
      color: '#3B82F6',
    },
    {
      icon: 'flash-outline',
      title: 'AI Powered',
      description: 'Advanced machine learning algorithms',
      color: '#8B5CF6',
    },
    {
      icon: 'people-outline',
      title: 'Social Features',
      description: 'Share and discuss summaries',
      color: '#10B981',
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Secure & Private',
      description: 'Your data is always protected',
      color: '#F59E0B',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    scale.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigation.navigate('Summarizer' as never);
    } else {
      navigation.navigate('Login' as never);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6', '#EC4899']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Animated.View style={[styles.logoContainer, animatedStyle]}>
            <Ionicons name="brain" size={60} color="#FFFFFF" />
          </Animated.View>
          
          <Text style={styles.heroTitle}>BharatSummarizer</Text>
          <Text style={styles.heroSubtitle}>
            Summarizer - Advanced AI for Indian Languages
          </Text>
          
          <View style={styles.languageDisplay}>
            <Text style={styles.languageText}>
              {languages[currentLanguage].native}
            </Text>
            <Text style={styles.languageSubtext}>
              {languages[currentLanguage].name}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F3F4F6']}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>
                {isAuthenticated ? 'Start Summarizing' : 'Get Started'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#3B82F6" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose BharatSummarizer?</Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Summarizer' as never)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.actionGradient}
          >
            <Ionicons name="document-text" size={30} color="#FFFFFF" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Create Summary</Text>
              <Text style={styles.actionSubtitle}>
                Transform your text into concise summaries
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Compare' as never)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.actionGradient}
          >
            <Ionicons name="analytics" size={30} color="#FFFFFF" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Compare Features</Text>
              <Text style={styles.actionSubtitle}>
                See how we stack against competitors
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Help' as never)}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.actionGradient}
          >
            <Ionicons name="help-circle" size={30} color="#FFFFFF" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Help Center</Text>
              <Text style={styles.actionSubtitle}>
                Get support and learn how to use the app
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Our Impact</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>22+</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100K+</Text>
            <Text style={styles.statLabel}>Summaries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>99.9%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  heroSection: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 30,
  },
  languageDisplay: {
    alignItems: 'center',
    marginBottom: 40,
  },
  languageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  languageSubtext: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 4,
  },
  ctaButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    gap: 10,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  quickActions: {
    padding: 20,
  },
  actionCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  statsSection: {
    padding: 20,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default HomeScreen;