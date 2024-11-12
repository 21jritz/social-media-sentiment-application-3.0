export interface Post {
  id: string;
  text: string;
  created_at: string;
  account?: {
    username: string;
    display_name: string;
    avatar: string;
  };
}

export interface SentimentMetrics {
  overallScore: number;
  sentimentOverTime: Array<{ x: string; y: number }>;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  confidenceScores: number[];
  topKeywords: Array<{ keyword: string; count: number }>;
}

export interface SentimentAnalysis {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number;
}