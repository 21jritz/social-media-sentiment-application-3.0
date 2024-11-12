import { useSentimentStore } from '../store/sentimentStore';

class RealTimeService {
  private store: typeof useSentimentStore;
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.store = useSentimentStore;
  }

  private setupSocketConnection() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.store.getState().isMonitoring) {
        this.emitMockData();
      }
    }, 5000);
  }

  private emitMockData() {
    const mockData = {
      text: this.generateRandomPost(),
      sentiment: this.generateRandomSentiment(),
      timestamp: new Date().toISOString(),
    };

    const { alertThresholds, addNotification } = this.store.getState();

    if (mockData.sentiment.score > alertThresholds.positive) {
      addNotification(`High positive sentiment detected: ${mockData.text}`);
    } else if (mockData.sentiment.score < alertThresholds.negative) {
      addNotification(`High negative sentiment detected: ${mockData.text}`);
    }

    this.store.getState().updateData([
      mockData,
      ...this.store.getState().realTimeData.slice(0, 99),
    ]);
  }

  private generateRandomPost(): string {
    const templates = [
      "Just tried {product}! {sentiment}",
      "Can't believe the {sentiment} experience with {product}",
      "This new {product} update is {sentiment}",
      "{product} customer service is {sentiment}",
    ];

    const products = ["iPhone", "Netflix", "Amazon", "Tesla", "Google"];
    const sentiments = [
      "absolutely amazing",
      "terrible",
      "okay",
      "fantastic",
      "disappointing",
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

    return template
      .replace("{product}", product)
      .replace("{sentiment}", sentiment);
  }

  private generateRandomSentiment() {
    const score = (Math.random() * 2 - 1).toFixed(2);
    const confidence = (0.7 + Math.random() * 0.3).toFixed(2);
    return {
      score: parseFloat(score),
      confidence: parseFloat(confidence),
      emotions: this.generateRandomEmotions(),
    };
  }

  private generateRandomEmotions() {
    return {
      joy: Math.random(),
      sadness: Math.random(),
      anger: Math.random(),
      fear: Math.random(),
      surprise: Math.random(),
    };
  }

  startMonitoring() {
    this.store.getState().startMonitoring();
    this.setupSocketConnection();
  }

  stopMonitoring() {
    this.store.getState().stopMonitoring();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export const realTimeService = new RealTimeService();