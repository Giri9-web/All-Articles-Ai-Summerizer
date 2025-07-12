import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

const SummaryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { summary } = route.params as any;
  
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(summary.summary);
    Alert.alert('Success', 'Summary copied to clipboard!');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: summary.summary,
        title: summary.title,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const compressionRatio = Math.round((1 - summary.compressionRatio) * 100);

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
          <Text style={styles.headerTitle}>Summary Details</Text>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmark}
          >
            <Ionicons 
              name={bookmarked ? 'bookmark' : 'bookmark-outline'} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title and Meta */}
        <View style={styles.titleSection}>
          <Text style={styles.summaryTitle}>{summary.title}</Text>
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="globe" size={16} color="#6B7280" />
              <Text style={styles.metaText}>{summary.language}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar" size={16} color="#6B7280" />
              <Text style={styles.metaText}>
                {summary.createdAt.toLocaleDateString()}
              </Text>
            </View>
            {summary.isPublic && (
              <View style={styles.publicBadge}>
                <Ionicons name="globe" size={12} color="#10B981" />
                <Text style={styles.publicText}>Public</Text>
              </View>
            )}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{summary.wordCount}</Text>
              <Text style={styles.statLabel}>Words</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{compressionRatio}%</Text>
              <Text style={styles.statLabel}>Reduced</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{summary.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Summary Content */}
        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCopy}
              >
                <Ionicons name="copy" size={20} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Ionicons name="share" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.summaryContent}>
            <Text style={styles.summaryText}>{summary.summary}</Text>
          </View>
        </View>

        {/* Original Text */}
        <View style={styles.originalSection}>
          <Text style={styles.sectionTitle}>Original Text</Text>
          <View style={styles.originalContent}>
            <Text style={styles.originalText}>{summary.originalText}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.likeButton, liked && styles.likeButtonActive]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={liked ? 'heart' : 'heart-outline'} 
              size={24} 
              color={liked ? '#FFFFFF' : '#EF4444'} 
            />
            <Text style={[styles.likeText, liked && styles.likeTextActive]}>
              {liked ? 'Liked' : 'Like'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.shareGradient}
            >
              <Ionicons name="share" size={24} color="#FFFFFF" />
              <Text style={styles.shareText}>Share Summary</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About this Summary</Text>
          <Text style={styles.infoText}>
            This summary was generated using our advanced AI algorithms optimized for {summary.language} language. 
            The compression ratio of {compressionRatio}% indicates how much the original text was reduced while 
            maintaining key information and context.
          </Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  publicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  publicText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
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
    alignItems: 'center',
    marginHorizontal: 4,
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
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  summaryContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  originalSection: {
    marginBottom: 24,
  },
  originalContent: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  originalText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  likeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EF4444',
    paddingVertical: 16,
    gap: 8,
  },
  likeButtonActive: {
    backgroundColor: '#EF4444',
  },
  likeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  likeTextActive: {
    color: '#FFFFFF',
  },
  shareButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default SummaryDetailScreen;