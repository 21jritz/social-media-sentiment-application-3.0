import React from 'react';
import { Line } from 'react-chartjs-2';
import { Play, Pause } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RealTimeMonitor = () => {
  const [isMonitoring, setIsMonitoring] = React.useState(false);

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => `-${i}s`).reverse(),
    datasets: [
      {
        label: 'Sentiment Score',
        data: Array.from({ length: 10 }, () => Math.random() * 2 - 1),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: -1,
        max: 1
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Real-Time Monitor</h2>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`flex items-center px-4 py-2 rounded ${
            isMonitoring ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {isMonitoring ? (
            <>
              <Pause className="w-4 h-4 mr-2" /> Stop
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" /> Start
            </>
          )}
        </button>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RealTimeMonitor;