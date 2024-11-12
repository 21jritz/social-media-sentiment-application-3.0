import React from 'react';
import { Bar } from 'react-chartjs-2';

interface KeywordAnalysisProps {
  keywords: Array<{ keyword: string; count: number }>;
}

const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keywords }) => {
  const data = {
    labels: keywords.map(k => k.keyword),
    datasets: [{
      label: 'Frequency',
      data: keywords.map(k => k.count),
      backgroundColor: 'rgba(90, 103, 216, 0.6)'
    }]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Top Keywords</h2>
      <Bar data={data} />
    </div>
  );
};

export default KeywordAnalysis;