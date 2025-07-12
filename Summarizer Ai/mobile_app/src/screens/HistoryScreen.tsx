import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SummaryItem {
  id: string;
  title: string;
  summary: string;
  originalText: string;
  language: string;
  createdAt: Date;
  wordCount: number;
  compressionRatio: number;
  likes: number;
  isPublic: boolean;
}

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: any) => state.auth);
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, public, private

  // Mock data
  const mockSummaries: SummaryItem[] = [
    {
      id: '1',
      title: 'AI Technology Article',
      summary: 'Artificial Intelligence is transforming industries worldwide...',
      originalText: 'Long article about AI technology and its impact...',
      language: 'English',
      createdAt: new Date('2024-01-15'),
      wordCount: 150,
      compressionRatio: 0.3,
      likes: 12,
      isPublic: true,
    },
    {
      id: '2',
      title: 'भारतीय संस्कृति',
      summary: 'भारतीय संस्कृति विविधताओं से भरपूर है...',
      originalText: 'भारतीय संस्कृति के बारे में विस्तृत लेख...',
      language: 'Hindi',
      createdAt: new Date('2024-01-14'),
      wordCount: 200,
      compressionRatio: 0.4,
      likes: 8,
      isPublic: false,
    },
    {
      id: '3',
      title: 'Climate Change Report',
      summary: 'Climate change is one of the most pressing issues...',
      originalText: 'Detailed report on climate change impacts...',
      language: 'English',
      createdAt: new Date('2024-01-13'),
      wordCount: 180,
      compressionRatio: 0.35,
      likes: 15,
      isPublic: true,
    },
  ];

  useEffect(() => {
    setSummaries(mockSummaries);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDeleteSummary = (id: string) => {
    Alert.alert(
      'Delete Summary',
      'Are you sure you want to delete this summary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSummaries(prev => prev.filter(item => item.id !== id));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        },
      ]
    );
  };

  const handleShareSummary = (item: SummaryItem) => {
    // Implement sharing logic
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const filteredSummaries = summaries.filter(item => {
    if (filter === 'public') return item.isPublic;
    if (filter === 'private') return !item.isPublic;
    return true;
  });

  const renderSummaryItem = ({ item, index }: { item: SummaryItem; index: number }) => (
    <Animated.View
      entering={withSpring(index * 100)}
      style={styles.summaryCard}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('SummaryDetail' as never, { summary: item } as never)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <Text style={styles.summaryTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.languageBadge}>
              <Text style={styles.languageText}>{item.language}</Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            {item.isPublic && (
              <View style={styles.publicBadge}>
                <Ionicons name="globe" size={12} color="#10B981" />
              </View>
            )}
            <TouchableOpacity
              onPress={() => handleShareSummary(item)}
              style={styles.actionButton}
            >
              <Ionicons name="share-outline" size={18} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteSummary(item.id)}
              style={styles.actionButton}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.summaryPreview} numberOfLines={3}>
          {item.summary}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="text" size={14} color="#6B7280" />
              <Text style={styles.statText}>{item.wordCount} words</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trending-down" size={14} color="#10B981" />
              <Text style={styles.statText}>
                {Math.round((1 - item.compressionRatio) * 100)}% reduced
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={14} color="#EF4444" />
              <Text style={styles.statText}>{item.likes}</Text>
            </View>
          </View>
          <Text style={styles.dateText}>
            {item.createdAt.toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No Summaries Yet</Text>
      <Text style={styles.emptyDescription}>
        Start creating summaries to see them here
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Summarizer' as never)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.createGradient}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.createText}>Create Summary</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['all', 'public', 'private'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterTab,
              filter === filterType && styles.filterTabActive
            ]}
            onPress={() => setFilter(filterType)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.filterText,
              filter === filterType && styles.filterTextActive
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary List */}
      <FlatList
        data={filteredSummaries}
        renderItem={renderSummaryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  languageBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  languageText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  publicBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryPreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
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
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  createGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  createText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HistoryScreen;