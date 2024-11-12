import { Subject } from 'rxjs';
import { SocialMediaPost } from '../types/data';
import { analyzeSentiment } from './sentimentService';
import { detectLanguage } from './languageDetectionService';

interface ProcessedPost extends SocialMediaPost {
  sentiment: number;
  language: string;
  processed_at: string;
}

export class RealTimeProcessor {
  private dataStream = new Subject<ProcessedPost>();
  private processingQueue: SocialMediaPost[] = [];
  private isProcessing = false;

  constructor() {
    this.startProcessing();
  }

  async addToQueue(posts: SocialMediaPost[]) {
    this.processingQueue.push(...posts);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  subscribe(callback: (post: ProcessedPost) => void) {
    return this.dataStream.subscribe(callback);
  }

  private async processQueue() {
    if (this.processingQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const post = this.processingQueue.shift()!;

    try {
      const [sentimentResult, languageResult] = await Promise.all([
        analyzeSentiment(post.content),
        detectLanguage(post.content)
      ]);

      const processedPost: ProcessedPost = {
        ...post,
        sentiment: sentimentResult.score,
        language: languageResult.language,
        processed_at: new Date().toISOString()
      };

      this.dataStream.next(processedPost);
    } catch (error) {
      console.error('Error processing post:', error);
    }

    // Process next item in queue
    setTimeout(() => this.processQueue(), 100);
  }

  private startProcessing() {
    setInterval(() => {
      if (!this.isProcessing && this.processingQueue.length > 0) {
        this.processQueue();
      }
    }, 1000);
  }
}