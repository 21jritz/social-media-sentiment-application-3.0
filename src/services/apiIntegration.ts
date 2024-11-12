import axios from 'axios';
import { SocialMediaPost } from '../types/data';

export class APIIntegration {
  private apiKeys: Record<string, string> = {
    twitter: import.meta.env.VITE_TWITTER_API_KEY,
    facebook: import.meta.env.VITE_FACEBOOK_API_KEY,
    instagram: import.meta.env.VITE_INSTAGRAM_API_KEY,
    mastodon: import.meta.env.VITE_MASTODON_API_KEY
  };

  async fetchFromAllSources(query: string): Promise<SocialMediaPost[]> {
    try {
      const [twitterData, facebookData, instagramData] = await Promise.all([
        this.fetchTwitterData(query),
        this.fetchFacebookData(query),
        this.fetchInstagramData(query)
      ]);

      return [...twitterData, ...facebookData, ...instagramData];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch social media data');
    }
  }

  private async fetchTwitterData(query: string): Promise<SocialMediaPost[]> {
    // Mock implementation for development
    return this.generateMockPosts(query, 'twitter', 10);
  }

  private async fetchFacebookData(query: string): Promise<SocialMediaPost[]> {
    return this.generateMockPosts(query, 'facebook', 8);
  }

  private async fetchInstagramData(query: string): Promise<SocialMediaPost[]> {
    return this.generateMockPosts(query, 'instagram', 6);
  }

  private generateMockPosts(query: string, source: string, count: number): SocialMediaPost[] {
    const templates = [
      `Really loving the ${query}! #awesome`,
      `Not happy with ${query}. Needs improvement.`,
      `${query} is exactly what I needed!`,
      `Having issues with ${query}. #frustrated`,
      `Mixed feelings about ${query}.`
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `${source}-${i}`,
      content: templates[Math.floor(Math.random() * templates.length)],
      source,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      engagement: {
        likes: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50)
      }
    }));
  }
}