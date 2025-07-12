import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as Haptics from 'expo-haptics';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    offlineMode: false,
    analytics: true,
    crashReporting: true,
    defaultLanguage: 'hi',
    defaultSummaryLength: 'medium',
  });

  const settingSections = [
    {
      title: 'General',
      items: [
        {
          key: 'notifications',
          title: 'Push Notifications',
          description: 'Receive updates about your summaries',
          type: 'toggle',
          icon: 'notifications-outline',
        },
        {
          key: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch to dark theme',
          type: 'toggle',
          icon: 'moon-outline',
        },
        {
          key: 'autoSave',
          title: 'Auto Save',
          description: 'Automatically save summaries',
          type: 'toggle',
          icon: 'save-outline',
        },
      ],
    },
    {
      title: 'Advanced',
      items: [
        {
          key: 'offlineMode',
          title: 'Offline Mode',
          description: 'Enable basic functionality offline',
          type: 'toggle',
          icon: 'cloud-offline-outline',
        },
        {
          key: 'defaultLanguage',
          title: 'Default Language',
          description: 'Set your preferred language',
          type: 'select',
          icon: 'globe-outline',
          value: 'Hindi',
        },
        {
          key: 'defaultSummaryLength',
          title: 'Default Summary Length',
          description: 'Set preferred summary length',
          type: 'select',
          icon: 'resize-outline',
          value: 'Medium',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          key: 'analytics',
          title: 'Usage Analytics',
          description: 'Help improve the app with usage data',
          type: 'toggle',
          icon: 'analytics-outline',
        },
        {
          key: 'crashReporting',
          title: 'Crash Reporting',
          description: 'Send crash reports to improve stability',
          type: 'toggle',
          icon: 'bug-outline',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          key: 'changePassword',
          title: 'Change Password',
          description: 'Update your account password',
          type: 'action',
          icon: 'lock-closed-outline',
        },
        {
          key: 'exportData',
          title: 'Export Data',
          description: 'Download your summaries and data',
          type: 'action',
          icon: 'download-outline',
        },
        {
          key: 'deleteAccount',
          title: 'Delete Account',
          description: 'Permanently delete your account',
          type: 'action',
          icon: 'trash-outline',
          danger: true,
        },
      ],
    },
  ];

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleAction = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    switch (key) {
      case 'changePassword':
        Alert.alert('Change Password', 'This feature will be available soon.');
        break;
      case 'exportData':
        Alert.alert('Export Data', 'Your data export will be ready shortly.');
        break;
      case 'deleteAccount':
        Alert.alert(
          'Delete Account',
          'Are you sure you want to permanently delete your account? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => {} },
          ]
        );
        break;
      case 'defaultLanguage':
        navigation.navigate('LanguageMenu' as never, {
          onLanguageSelect: (language: any) => {
            setSettings(prev => ({ ...prev, defaultLanguage: language.code }));
          },
          selectedLanguage: settings.defaultLanguage,
        } as never);
        break;
    }
  };

  const renderSettingItem = (item: any) => {
    if (item.type === 'toggle') {
      return (
        <View key={item.key} style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name={item.icon} size={24} color="#6B7280" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
          </View>
          <Switch
            value={settings[item.key as keyof typeof settings] as boolean}
            onValueChange={() => handleToggle(item.key)}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            thumbColor="#FFFFFF"
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.key}
        style={styles.settingItem}
        onPress={() => handleAction(item.key)}
        activeOpacity={0.7}
      >
        <View style={styles.settingInfo}>
          <Ionicons 
            name={item.icon} 
            size={24} 
            color={item.danger ? '#EF4444' : '#6B7280'} 
          />
          <View style={styles.settingText}>
            <Text style={[
              styles.settingTitle,
              item.danger && styles.settingTitleDanger
            ]}>
              {item.title}
            </Text>
            <Text style={styles.settingDescription}>{item.description}</Text>
            {item.value && (
              <Text style={styles.settingValue}>{item.value}</Text>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Customize your Summarizer experience
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>BharatSummarizer v1.0.0</Text>
          <Text style={styles.appDescription}>
            Advanced AI for Indian Languages
          </Text>
          <Text style={styles.appCopyright}>
            © 2024 BharatSummarizer. All rights reserved.
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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingTitleDanger: {
    color: '#EF4444',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingValue: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default SettingsScreen;