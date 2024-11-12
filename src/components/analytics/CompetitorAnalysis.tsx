import React from 'react';
import { Bar, Radar } from 'react-chartjs-2';

const CompetitorAnalysis: React.FC = () => {
  const competitors = ['Our Brand', 'Competitor A', 'Competitor B', 'Competitor C'];
  
  const marketShareData = {
    labels: competitors,
    datasets: [{
      label: 'Market Share',
      data: [35, 28, 22, 15],
      backgroundColor: [
        'rgba(59, 130, 246, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)'
      ]
    }]
  };

  const sentimentComparisonData = {
    labels: ['Brand Sentiment', 'Customer Satisfaction', 'Social Media Presence', 'Innovation', 'Price Competitiveness'],
    datasets: competitors.map((competitor, index) => ({
      label: competitor,
      data: Array(5).fill(0).map(() => Math.random() * 100),
      backgroundColor: `rgba(${index * 60}, ${130 + index * 30}, 246, 0.2)`,
      borderColor: `rgba(${index * 60}, ${130 + index * 30}, 246, 1)`,
    }))
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Market Share Analysis</h3>
          <Bar
            data={marketShareData}
            options={{
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Competitive Analysis</h3>
          <Radar data={sentimentComparisonData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Competitive Strengths & Weaknesses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitors.map(competitor => (
            <div key={competitor} className="space-y-3">
              <h4 className="font-medium">{competitor}</h4>
              <div className="space-y-2">
                {['Price', 'Quality', 'Service', 'Innovation'].map(metric => (
                  <div key={metric} className="flex items-center space-x-2">
                    <span className="text-sm w-20">{metric}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;