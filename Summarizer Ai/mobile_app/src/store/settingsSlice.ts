import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    enabled: boolean;
    summaryComplete: boolean;
    newFeatures: boolean;
    marketing: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
  };
  defaultSummaryLength: 'short' | 'medium' | 'long';
  autoSave: boolean;
  offlineMode: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  notifications: {
    enabled: true,
    summaryComplete: true,
    newFeatures: true,
    marketing: false,
  },
  privacy: {
    analytics: true,
    crashReporting: true,
  },
  defaultSummaryLength: 'medium',
  autoSave: true,
  offlineMode: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateNotifications: (state, action: PayloadAction<Partial<SettingsState['notifications']>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updatePrivacy: (state, action: PayloadAction<Partial<SettingsState['privacy']>>) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    updateDefaultSummaryLength: (state, action: PayloadAction<'short' | 'medium' | 'long'>) => {
      state.defaultSummaryLength = action.payload;
    },
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
    },
    toggleOfflineMode: (state) => {
      state.offlineMode = !state.offlineMode;
    },
    resetSettings: () => initialState,
  },
});

export const {
  updateTheme,
  updateLanguage,
  updateNotifications,
  updatePrivacy,
  updateDefaultSummaryLength,
  toggleAutoSave,
  toggleOfflineMode,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;