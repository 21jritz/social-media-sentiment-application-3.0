import React from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowUp, ArrowDown } from 'lucide-react';

const TrendAnalysis: React.FC = () => {
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sentiment Trend',
        data: [0.2, 0.4, 0.3, 0.6, 0.5, 0.8],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'Engagement Rate',
        data: [0.3, 0.2, 0.5, 0.4, 0.7, 0.6],
        borderColor: 'rgb(234, 88, 12)',
        tension: 0.4
      }
    ]
  };

  const keyTrends = [
    { label: 'Positive Mentions', value: '+23%', trend: 'up' },
    { label: 'User Engagement', value: '+15%', trend: 'up' },
    { label: 'Response Time', value: '-12%', trend: 'down' },
    { label: 'Brand Reach', value: '+45%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyTrends.map(({ label, value, trend }) => (
          <div key={label} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-600">{label}</h3>
              {trend === 'up' ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
        <Line
          data={trendData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 1
              }
            }
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Emerging Topics</h3>
          <div className="space-y-3">
            {['Customer Service', 'Product Quality', 'User Experience', 'Price'].map(topic => (
              <div key={topic} className="flex justify-between items-center">
                <span>{topic}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sentiment Patterns</h3>
          <div className="space-y-4">
            {['Morning', 'Afternoon', 'Evening', 'Night'].map(time => (
              <div key={time} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{time}</span>
                  <span className="text-sm font-medium">
                    {Math.floor(Math.random() * 40 + 60)}% Positive
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;