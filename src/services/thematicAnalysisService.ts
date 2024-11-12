interface Theme {
  name: string;
  keywords: string[];
  sentiment: number;
  count: number;
}

export class ThematicAnalysisService {
  private themes: Record<string, Theme> = {
    'customer_service': {
      name: 'Customer Service',
      keywords: ['support', 'help', 'service', 'assistant', 'representative'],
      sentiment: 0,
      count: 0
    },
    'product_quality': {
      name: 'Product Quality',
      keywords: ['quality', 'durability', 'reliable', 'broken', 'defective'],
      sentiment: 0,
      count: 0
    },
    'pricing': {
      name: 'Pricing',
      keywords: ['price', 'cost', 'expensive', 'cheap', 'affordable'],
      sentiment: 0,
      count: 0
    },
    'user_experience': {
      name: 'User Experience',
      keywords: ['experience', 'interface', 'easy', 'difficult', 'intuitive'],
      sentiment: 0,
      count: 0
    }
  };

  analyzeThemes(posts: { content: string; sentiment: number }[]): Theme[] {
    // Reset counts and sentiments
    Object.values(this.themes).forEach(theme => {
      theme.count = 0;
      theme.sentiment = 0;
    });

    // Analyze each post
    posts.forEach(post => {
      const content = post.content.toLowerCase();
      
      Object.values(this.themes).forEach(theme => {
        if (theme.keywords.some(keyword => content.includes(keyword))) {
          theme.count++;
          theme.sentiment += post.sentiment;
        }
      });
    });

    // Calculate average sentiment for each theme
    Object.values(this.themes).forEach(theme => {
      if (theme.count > 0) {
        theme.sentiment = theme.sentiment / theme.count;
      }
    });

    return Object.values(this.themes)
      .filter(theme => theme.count > 0)
      .sort((a, b) => b.count - a.count);
  }
}