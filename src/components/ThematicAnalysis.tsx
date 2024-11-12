import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Theme {
  name: string;
  count: number;
  sentiment: number;
}

interface Props {
  themes: Theme[];
}

const ThematicAnalysis: React.FC<Props> = ({ themes }) => {
  const data = {
    labels: themes.map(theme => theme.name),
    datasets: [
      {
        label: 'Mentions',
        data: themes.map(theme => theme.count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Sentiment',
        data: themes.map(theme => theme.sentiment),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'sentiment'
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Mentions'
        }
      },
      sentiment: {
        position: 'right' as const,
        beginAtZero: true,
        max: 1,
        min: -1,
        title: {
          display: true,
          text: 'Sentiment Score'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Thematic Analysis'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Theme Analysis</h2>
      <Bar data={data} options={options} />
      <div className="mt-4 space-y-2">
        {themes.map(theme => (
          <div key={theme.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{theme.name}</span>
            <div className="flex space-x-4">
              <span className="text-blue-600">{theme.count} mentions</span>
              <span className={`${
                theme.sentiment > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {theme.sentiment.toFixed(2)} sentiment
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThematicAnalysis;