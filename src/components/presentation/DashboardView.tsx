import React from 'react';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

const DashboardView: React.FC = () => {
  const metrics = [
    { label: 'Overall Sentiment', value: '+0.75', trend: 'up' },
    { label: 'Total Mentions', value: '1,234', trend: 'up' },
    { label: 'Engagement Rate', value: '8.5%', trend: 'down' }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sentiment Score',
      data: [0.65, 0.72, 0.68, 0.75, 0.82, 0.79],
      backgroundColor: 'rgba(59, 130, 246, 0.5)'
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <span className={`ml-2 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? '↑' : '↓'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Trend</h3>
        <div className="h-64">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;