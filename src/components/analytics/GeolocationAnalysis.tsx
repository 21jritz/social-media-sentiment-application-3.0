import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Globe } from 'lucide-react';

const GeolocationAnalysis: React.FC = () => {
  const regionData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [0.8, 0.6, 0.7, 0.5, 0.4, 0.6],
        backgroundColor: 'rgba(59, 130, 246, 0.6)'
      },
      {
        label: 'Engagement Rate',
        data: [0.6, 0.7, 0.5, 0.4, 0.3, 0.5],
        backgroundColor: 'rgba(16, 185, 129, 0.6)'
      }
    ]
  };

  const topLocations = [
    { city: 'New York', country: 'USA', sentiment: 0.8, volume: 2500 },
    { city: 'London', country: 'UK', sentiment: 0.7, volume: 2100 },
    { city: 'Tokyo', country: 'Japan', sentiment: 0.75, volume: 1800 },
    { city: 'Paris', country: 'France', sentiment: 0.65, volume: 1500 },
    { city: 'Sydney', country: 'Australia', sentiment: 0.7, volume: 1200 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Regional Analysis</h3>
          <Bar
            data={regionData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1
                }
              }
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Locations</h3>
          <div className="space-y-4">
            {topLocations.map(location => (
              <div
                key={location.city}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{location.city}</p>
                    <p className="text-sm text-gray-500">{location.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {(location.sentiment * 100).toFixed(0)}% Positive
                  </p>
                  <p className="text-sm text-gray-500">{location.volume} mentions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Geographic Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Sentiment by Region', 'Engagement Hotspots', 'Growth Markets'].map(metric => (
            <div key={metric} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">{metric}</h4>
              <div className="space-y-2">
                {['High', 'Medium', 'Low'].map(level => (
                  <div key={level} className="flex justify-between text-sm">
                    <span>{level}</span>
                    <span>{Math.floor(Math.random() * 40 + 20)} regions</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeolocationAnalysis;