import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  keywords: string[];
  confidence: number;
}

interface SummaryState {
  summaries: SummaryItem[];
  currentSummary: SummaryItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SummaryState = {
  summaries: [],
  currentSummary: null,
  isLoading: false,
  error: null,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    summarizeStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    summarizeSuccess: (state, action: PayloadAction<SummaryItem>) => {
      state.isLoading = false;
      state.currentSummary = action.payload;
      state.summaries.unshift(action.payload);
      state.error = null;
    },
    summarizeFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addSummary: (state, action: PayloadAction<SummaryItem>) => {
      state.summaries.unshift(action.payload);
    },
    updateSummary: (state, action: PayloadAction<{ id: string; updates: Partial<SummaryItem> }>) => {
      const { id, updates } = action.payload;
      const index = state.summaries.findIndex(summary => summary.id === id);
      if (index !== -1) {
        state.summaries[index] = { ...state.summaries[index], ...updates };
      }
      if (state.currentSummary?.id === id) {
        state.currentSummary = { ...state.currentSummary, ...updates };
      }
    },
    deleteSummary: (state, action: PayloadAction<string>) => {
      state.summaries = state.summaries.filter(summary => summary.id !== action.payload);
      if (state.currentSummary?.id === action.payload) {
        state.currentSummary = null;
      }
    },
    likeSummary: (state, action: PayloadAction<string>) => {
      const summary = state.summaries.find(s => s.id === action.payload);
      if (summary) {
        summary.likes += 1;
      }
    },
    clearCurrentSummary: (state) => {
      state.currentSummary = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  summarizeStart,
  summarizeSuccess,
  summarizeFailure,
  addSummary,
  updateSummary,
  deleteSummary,
  likeSummary,
  clearCurrentSummary,
  clearError,
} = summarySlice.actions;

export default summarySlice.reducer;