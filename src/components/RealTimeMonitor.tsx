import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Play, Pause } from 'lucide-react';
import { useSentimentStore } from '../store/sentimentStore';
import { realTimeService } from '../services/realTimeService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentDataPoint {
  sentiment: {
    score: number;
  };
}

const RealTimeMonitor: React.FC = () => {
  const chartRef = useRef<ChartJS>(null);
  const { 
    realTimeData, 
    isMonitoring, 
    notifications,
    alertThresholds,
    setAlertThresholds,
    clearNotifications,
    startMonitoring,
    stopMonitoring 
  } = useSentimentStore();

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const toggleMonitoring = () => {
    if (isMonitoring) {
      realTimeService.stopMonitoring();
      stopMonitoring();
    } else {
      realTimeService.startMonitoring();
      startMonitoring();
    }
  };

  const chartData: ChartData<'line'> = {
    labels: Array.from({ length: Math.min(10, realTimeData.length) }, (_, i) => `-${i}s`).reverse(),
    datasets: [
      {
        label: 'Sentiment Score',
        data: (realTimeData as SentimentDataPoint[]).map(d => d.sentiment.score).slice(0, 10).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        fill: false
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sentiment Score'
        },
        min: -1,
        max: 1
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Real-Time Monitor</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMonitoring}
            className={`flex items-center px-4 py-2 rounded ${
              isMonitoring
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors duration-200`}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sentiment Trend</h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Alert Settings</h3>
            <button
              onClick={clearNotifications}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Positive Threshold
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={alertThresholds.positive}
                onChange={(e) =>
                  setAlertThresholds({
                    ...alertThresholds,
                    positive: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
              <span className="text-sm text-gray-500">
                {alertThresholds.positive.toFixed(1)}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Negative Threshold
              </label>
              <input
                type="range"
                min="-1"
                max="0"
                step="0.1"
                value={alertThresholds.negative}
                onChange={(e) =>
                  setAlertThresholds({
                    ...alertThresholds,
                    negative: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
              <span className="text-sm text-gray-500">
                {alertThresholds.negative.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 rounded text-sm"
              >
                {notification}
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No notifications yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;