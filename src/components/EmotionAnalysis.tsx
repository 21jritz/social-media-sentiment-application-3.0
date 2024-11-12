import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface EmotionData {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
}

interface Props {
  emotions: EmotionData;
}

const EmotionAnalysis: React.FC<Props> = ({ emotions }) => {
  const data = {
    labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Surprise'],
    datasets: [
      {
        label: 'Emotion Intensity',
        data: [
          emotions.joy,
          emotions.sadness,
          emotions.anger,
          emotions.fear,
          emotions.surprise,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Emotion Analysis</h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default EmotionAnalysis;