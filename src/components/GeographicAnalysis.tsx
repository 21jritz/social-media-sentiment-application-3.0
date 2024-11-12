import React from 'react';
import { Pie } from 'react-chartjs-2';

interface RegionData {
  region: string;
  sentiment: number;
  postCount: number;
}

interface Props {
  data: RegionData[];
}

const GeographicAnalysis: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.region),
    datasets: [
      {
        data: data.map(d => d.postCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      },
      title: {
        display: true,
        text: 'Geographic Distribution'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Geographic Analysis</h2>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 space-y-2">
        {data.map(region => (
          <div key={region.region} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">{region.region}</span>
            <div className="flex space-x-4">
              <span className="text-blue-600">{region.postCount} posts</span>
              <span className={`${
                region.sentiment > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {region.sentiment.toFixed(2)} sentiment
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicAnalysis;