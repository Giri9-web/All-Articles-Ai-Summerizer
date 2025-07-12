import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Copy, 
  CheckCircle, 
  TrendingDown,
  Star,
  Calendar,
  User,
  Globe
} from 'lucide-react';
import { SummaryResult, Comment } from '../../types';
import { useSummaryStore } from '../../store/summaryStore';
import { useAuthStore } from '../../store/authStore';
import { indianLanguages } from '../../data/languages';
import toast from 'react-hot-toast';

interface SummaryCardProps {
  summary: SummaryResult;
  showSocial?: boolean;
}

export function SummaryCard({ summary, showSocial = true }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { likeSummary, addComment, shareSummary } = useSummaryStore();
  const { user, isAuthenticated } = useAuthStore();

  const language = indianLanguages.find(lang => lang.code === summary.language);
  const compressionPercentage = Math.round((1 - summary.compressionRatio) * 100);

  const handleCopy = async () => {
    if (summary.summary) {
      await navigator.clipboard.writeText(summary.summary);
      setCopied(true);
      toast.success('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like summaries');
      return;
    }
    likeSummary(summary.id);
    toast.success('Summary liked!');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'BharatSummarizer - AI Summary',
        text: summary.summary,
        url: window.location.href,
      });
      shareSummary(summary.id);
    } catch (error) {
      // Fallback to copying link
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
      shareSummary(summary.id);
    }
  };

  const handleAddComment = () => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to comment');
      return;
    }
    
    if (!newComment.trim()) return;

    addComment(summary.id, {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newComment.trim(),
    });
    
    setNewComment('');
    toast.success('Comment added!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {language?.name} ({language?.nativeName})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {Math.round(summary.confidence * 100)}% confidence
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {summary.createdAt.toLocaleDateString()}
          </div>
        </div>

        {/* Keywords */}
        {summary.keywords.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {summary.keywords.slice(0, 6).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary.summary}
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{summary.summaryStats.words}</div>
            <div className="text-xs text-gray-600">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{summary.summaryStats.sentences}</div>
            <div className="text-xs text-gray-600">Sentences</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
              <TrendingDown className="w-5 h-5" />
              {compressionPercentage}%
            </div>
            <div className="text-xs text-gray-600">Reduced</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(summary.compressionRatio * 100)}%
            </div>
            <div className="text-xs text-gray-600">Retained</div>
          </div>
        </div>
      </div>

      {/* Social Actions */}
      {showSocial && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Heart className="w-4 h-4" />
                {summary.likes}
              </button>
              
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                {summary.comments.length}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                {summary.shares}
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              {/* Add Comment */}
              {isAuthenticated && (
                <div className="mb-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-3">
                {summary.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      {comment.userAvatar ? (
                        <img src={comment.userAvatar} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-gray-600 text-sm font-semibold">
                          {comment.userName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{comment.userName}</span>
                          <span className="text-xs text-gray-500">
                            {comment.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}