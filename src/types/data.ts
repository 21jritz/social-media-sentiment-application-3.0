export interface DataSource {
  name: string;
  enabled: boolean;
  apiKey?: string;
  apiEndpoint: string;
}

export interface SocialMediaPost {
  id: string;
  content: string;
  source: string;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface AnalysisMetrics {
  brandSentiment: number;
  customerSatisfaction: number;
  engagementRate: number;
  reachGrowth: number;
}

export interface EmotionData {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
}

export interface SentimentResult {
  score: number;
  confidence: number;
  emotions: EmotionData;
  aspects?: {
    [key: string]: {
      score: number;
      mentions: number;
    };
  };
}