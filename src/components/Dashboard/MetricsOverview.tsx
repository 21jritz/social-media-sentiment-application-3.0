import React from 'react';
import { TrendingUp, Heart, Users, Zap } from 'lucide-react';

const MetricsOverview = () => {
  const metrics = [
    {
      label: 'Brand Sentiment',
      value: '78%',
      icon: Heart,
      color: 'text-pink-500',
      trend: '↑'
    },
    {
      label: 'Customer Satisfaction',
      value: '92%',
      icon: Users,
      color: 'text-blue-500',
      trend: '↑'
    },
    {
      label: 'Engagement Rate',
      value: '6.8%',
      icon: Zap,
      color: 'text-yellow-500',
      trend: '↑'
    },
    {
      label: 'Reach Growth',
      value: '12.4%',
      icon: TrendingUp,
      color: 'text-green-500',
      trend: '↑'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
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