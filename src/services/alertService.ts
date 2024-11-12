import { Subject } from 'rxjs';

export interface Alert {
  id: string;
  type: 'sentiment' | 'keyword' | 'volume';
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

export interface AlertRule {
  id: string;
  type: 'sentiment' | 'keyword' | 'volume';
  condition: {
    threshold?: number;
    keywords?: string[];
    operator: 'gt' | 'lt' | 'eq' | 'contains';
  };
  severity: 'info' | 'warning' | 'critical';
}

export class AlertService {
  private alertStream = new Subject<Alert>();
  private rules: AlertRule[] = [];

  addRule(rule: AlertRule) {
    this.rules.push(rule);
  }

  removeRule(ruleId: string) {
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
  }

  checkConditions(data: any) {
    this.rules.forEach(rule => {
      const shouldAlert = this.evaluateRule(rule, data);
      if (shouldAlert) {
        const alert: Alert = {
          id: crypto.randomUUID(),
          type: rule.type,
          message: this.generateAlertMessage(rule, data),
          severity: rule.severity,
          timestamp: new Date().toISOString()
        };
        this.alertStream.next(alert);
      }
    });
  }

  subscribe(callback: (alert: Alert) => void) {
    return this.alertStream.subscribe(callback);
  }

  private evaluateRule(rule: AlertRule, data: any): boolean {
    switch (rule.type) {
      case 'sentiment':
        return this.evaluateSentimentRule(rule, data.sentiment);
      case 'keyword':
        return this.evaluateKeywordRule(rule, data.content);
      case 'volume':
        return this.evaluateVolumeRule(rule, data.volume);
      default:
        return false;
    }
  }

  private evaluateSentimentRule(rule: AlertRule, sentiment: number): boolean {
    const { threshold, operator } = rule.condition;
    switch (operator) {
      case 'gt': return sentiment > threshold!;
      case 'lt': return sentiment < threshold!;
      case 'eq': return sentiment === threshold!;
      default: return false;
    }
  }

  private evaluateKeywordRule(rule: AlertRule, content: string): boolean {
    const { keywords } = rule.condition;
    return keywords!.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()));
  }

  private evaluateVolumeRule(rule: AlertRule, volume: number): boolean {
    const { threshold, operator } = rule.condition;
    switch (operator) {
      case 'gt': return volume > threshold!;
      case 'lt': return volume < threshold!;
      case 'eq': return volume === threshold!;
      default: return false;
    }
  }

  private generateAlertMessage(rule: AlertRule, data: any): string {
    switch (rule.type) {
      case 'sentiment':
        return `Sentiment ${rule.condition.operator === 'gt' ? 'above' : 'below'} threshold: ${data.sentiment}`;
      case 'keyword':
        return `Keyword detected in content: "${data.content}"`;
      case 'volume':
        return `Post volume ${rule.condition.operator === 'gt' ? 'increased above' : 'decreased below'} threshold`;
      default:
        return 'Alert condition met';
    }
  }
}