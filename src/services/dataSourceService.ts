interface DataResponse {
  id: string;
  content: string;
  sentiment: number;
  timestamp: string;
}

interface Metrics {
  brandSentiment: number;
  customerSatisfaction: number;
  engagementRate: number;
  reachGrowth: number;
}

class DataSourceService {
  private metrics: Metrics = {
    brandSentiment: 0.78,
    customerSatisfaction: 0.92,
    engagementRate: 0.068,
    reachGrowth: 0.124
  };

  async collectData(query: string, sources: string[]): Promise<DataResponse[]> {
    // Simulate API call
    return Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      content: `Sample content about ${query}`,
      sentiment: Math.random() * 2 - 1,
      timestamp: new Date().toISOString()
    }));
  }

  getMetrics(): Metrics {
    return this.metrics;
  }

  updateMetrics(data: DataResponse[]): void {
    // Update metrics based on new data
    const sentiments = data.map(item => item.sentiment);
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    
    this.metrics = {
      ...this.metrics,
      brandSentiment: avgSentiment,
      engagementRate: Math.random() * 0.1, // Simulated engagement rate
      reachGrowth: Math.random() * 0.2 - 0.1 // Simulated reach growth
    };
  }
}

export const dataSourceService = new DataSourceService();