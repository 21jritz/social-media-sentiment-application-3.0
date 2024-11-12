import { Post, SentimentAnalysis, SentimentMetrics } from '../types';
import { analyzeSentiment } from './sentimentService';
import { formatDistance } from 'date-fns';

export const calculateMetrics = async (posts: Post[]): Promise<SentimentMetrics> => {
  const sentiments = await Promise.all(
    posts.map(post => analyzeSentiment(post.text))
  );

  const overallScore = sentiments.reduce((acc, curr) => acc + curr.score, 0) / sentiments.length;

  const sentimentOverTime = sentiments.map((s, i) => ({
    x: formatDistance(new Date(posts[i].created_at), new Date(), { addSuffix: true }),
    y: s.score
  }));

  const distribution = sentiments.reduce((acc, curr) => {
    if (curr.score > 0.3) acc.positive++;
    else if (curr.score < -0.3) acc.negative++;
    else acc.neutral++;
    return acc;
  }, { positive: 0, neutral: 0, negative: 0 });

  const topKeywords = extractTopKeywords(posts.map(p => p.text));

  return {
    overallScore,
    sentimentOverTime,
    sentimentDistribution: distribution,
    confidenceScores: sentiments.map(s => s.confidence || 1),
    topKeywords
  };
};

const extractTopKeywords = (texts: string[]): Array<{ keyword: string; count: number }> => {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have']);
  const words = texts.flatMap(text => 
    text.toLowerCase()
       .split(/\s+/)
       .filter(word => !stopWords.has(word) && word.length > 2)
  );

  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({ keyword, count }));
};