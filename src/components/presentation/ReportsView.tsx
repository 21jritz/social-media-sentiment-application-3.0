import React from 'react';
import { Line } from 'react-chartjs-2';
import { FileText, Download } from 'lucide-react';

const ReportsView: React.FC = () => {
  const reportTypes = [
    { id: 'sentiment', name: 'Sentiment Analysis', period: 'Last 30 days' },
    { id: 'engagement', name: 'Engagement Metrics', period: 'Last 7 days' },
    { id: 'comparison', name: 'Competitor Comparison', period: 'Current month' }
  ];

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Sentiment Score',
      data: [0.65, 0.72, 0.68, 0.75],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>
        <div className="space-y-4">
          {reportTypes.map(report => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.period}</p>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                  <FileText className="w-4 h-4 mr-1" />
                  Preview
                </button>
                <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-700">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Trend Overview</h2>
        <div className="h-64">
          <Line
            data={trendData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsView;