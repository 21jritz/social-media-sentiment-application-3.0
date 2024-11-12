import React from 'react';
import { TrendingUp, Heart, Users, Zap } from 'lucide-react';
import { AnalysisMetrics } from '../types/data';

interface Props {
  metrics: AnalysisMetrics;
}

const MetricsOverview: React.FC<Props> = ({ metrics }) => {
  const metricsData = [
    {
      label: 'Brand Sentiment',
      value: `${(metrics.brandSentiment * 100).toFixed(1)}%`,
      icon: Heart,
      color: 'text-pink-500',
      trend: metrics.brandSentiment > 0 ? '↑' : '↓'
    },
    {
      label: 'Customer Satisfaction',
      value: `${metrics.customerSatisfaction.toFixed(1)}%`,
      icon: Users,
      color: 'text-blue-500',
      trend: metrics.customerSatisfaction > 75 ? '↑' : '↓'
    },
    {
      label: 'Engagement Rate',
      value: `${metrics.engagementRate.toFixed(1)}%`,
      icon: Zap,
      color: 'text-yellow-500',
      trend: metrics.engagementRate > 5 ? '↑' : '↓'
    },
    {
      label: 'Reach Growth',
      value: `${metrics.reachGrowth.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      trend: metrics.reachGrowth > 0 ? '↑' : '↓'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full bg-opacity-10 ${metric.color} bg-current`}>
              <Icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-xl font-semibold flex items-center">
                {metric.value}
                <span className={`ml-1 text-sm ${
                  metric.trend === '↑' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.trend}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsOverview;