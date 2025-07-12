import { create } from 'zustand';
import { SummaryResult, Comment } from '../types';

interface SummaryState {
  summaries: SummaryResult[];
  currentSummary: SummaryResult | null;
  addSummary: (summary: SummaryResult) => void;
  likeSummary: (summaryId: string) => void;
  addComment: (summaryId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void;
  shareSummary: (summaryId: string) => void;
  getSummaryById: (id: string) => SummaryResult | undefined;
}

export const useSummaryStore = create<SummaryState>((set, get) => ({
  summaries: [],
  currentSummary: null,

  addSummary: (summary: SummaryResult) => {
    set(state => ({
      summaries: [summary, ...state.summaries],
      currentSummary: summary
    }));
  },

  likeSummary: (summaryId: string) => {
    set(state => ({
      summaries: state.summaries.map(summary =>
        summary.id === summaryId
          ? { ...summary, likes: summary.likes + 1 }
          : summary
      )
    }));
  },

  addComment: (summaryId: string, commentData: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      likes: 0,
    };

    set(state => ({
      summaries: state.summaries.map(summary =>
        summary.id === summaryId
          ? { ...summary, comments: [...summary.comments, newComment] }
          : summary
      )
    }));
  },

  shareSummary: (summaryId: string) => {
    set(state => ({
      summaries: state.summaries.map(summary =>
        summary.id === summaryId
          ? { ...summary, shares: summary.shares + 1 }
          : summary
      )
    }));
  },

  getSummaryById: (id: string) => {
    return get().summaries.find(summary => summary.id === id);
  },
}));