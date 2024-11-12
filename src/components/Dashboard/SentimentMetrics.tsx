import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { SentimentMetrics as SentimentMetricsType } from '../../types';

interface SentimentMetricsProps {
  metrics: SentimentMetricsType;
}

const SentimentMetrics: React.FC<SentimentMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Overall Sentiment</h2>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2">
            {metrics.overallScore.toFixed(2)}
          </p>
          <p className="text-gray-500">
            {metrics.overallScore > 0.3 ? 'Positive' : 
             metrics.overallScore < -0.3 ? 'Negative' : 'Neutral'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sentiment Distribution</h2>
        <Pie
          data={{
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
              data: [
                metrics.sentimentDistribution.positive,
                metrics.sentimentDistribution.neutral,
                metrics.sentimentDistribution.negative
              ],
              backgroundColor: [
                'rgba(72, 187, 120, 0.6)',
                'rgba(237, 137, 54, 0.6)',
                'rgba(245, 101, 101, 0.6)'
              ]
            }]
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sentiment Over Time</h2>
        <Line
          data={{
            labels: metrics.sentimentOverTime.map(d => d.x),
            datasets: [{
              label: 'Sentiment Score',
              data: metrics.sentimentOverTime.map(d => d.y),
              borderColor: 'rgb(66, 153, 225)',
              tension: 0.1
            }]
          }}
          options={{
            scales: {
              y: {
                min: -1,
                max: 1
              }
            }
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Top Keywords</h2>
        <Bar
          data={{
            labels: metrics.topKeywords.map(k => k.keyword),
            datasets: [{
              label: 'Frequency',
              data: metrics.topKeywords.map(k => k.count),
              backgroundColor: 'rgba(90, 103, 216, 0.6)'
            }]
          }}
        />
      </div>
    </div>
  );
};

export default SentimentMetrics;