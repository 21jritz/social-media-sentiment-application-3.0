import React from 'react';
import { Pie } from 'react-chartjs-2';

interface SentimentDistributionProps {
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const SentimentDistribution: React.FC<SentimentDistributionProps> = ({ distribution }) => {
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [
        distribution.positive,
        distribution.neutral,
        distribution.negative
      ],
      backgroundColor: [
        'rgba(72, 187, 120, 0.6)',
        'rgba(237, 137, 54, 0.6)',
        'rgba(245, 101, 101, 0.6)'
      ]
    }]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sentiment Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default SentimentDistribution;