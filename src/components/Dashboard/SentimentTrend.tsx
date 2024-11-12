import React from 'react';
import { Line } from 'react-chartjs-2';

interface SentimentTrendProps {
  data: Array<{ x: string; y: number }>;
}

const SentimentTrend: React.FC<SentimentTrendProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.x),
    datasets: [{
      label: 'Sentiment Score',
      data: data.map(d => d.y),
      borderColor: 'rgb(66, 153, 225)',
      tension: 0.1
    }]
  };

  const options = {
    scales: {
      y: {
        min: -1,
        max: 1
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sentiment Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SentimentTrend;