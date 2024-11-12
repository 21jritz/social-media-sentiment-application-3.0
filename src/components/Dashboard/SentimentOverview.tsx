import React from 'react';

interface SentimentOverviewProps {
  score: number;
}

const SentimentOverview: React.FC<SentimentOverviewProps> = ({ score }) => {
  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-600';
    if (score < -0.3) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Overall Sentiment</h2>
      <div className="text-center">
        <p className={`text-4xl font-bold mb-2 ${getSentimentColor(score)}`}>
          {score.toFixed(2)}
        </p>
        <p className="text-gray-500">
          {getSentimentLabel(score)}
        </p>
      </div>
    </div>
  );
};

export default SentimentOverview;