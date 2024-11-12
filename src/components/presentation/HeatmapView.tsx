import React, { useEffect, useRef } from 'react';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  lat: number;
  lng: number;
  sentiment: number;
  count: number;
}

const HeatmapView: React.FC = () => {
  const mapRef = useRef(null);
  const center: [number, number] = [20, 0];
  const zoom = 2;

  const mockData: LocationData[] = [
    { lat: 40.7128, lng: -74.0060, sentiment: 0.8, count: 500 }, // New York
    { lat: 51.5074, lng: -0.1278, sentiment: 0.6, count: 300 },  // London
    { lat: 35.6762, lng: 139.6503, sentiment: 0.7, count: 400 }, // Tokyo
  ];

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.5) return '#22c55e';
    if (sentiment < -0.5) return '#ef4444';
    return '#f59e0b';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Sentiment Geographic Distribution</h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <Map center={center} zoom={zoom} ref={mapRef} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mockData.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={Math.sqrt(location.count) / 2}
              fillColor={getSentimentColor(location.sentiment)}
              color={getSentimentColor(location.sentiment)}
              weight={1}
              opacity={0.8}
              fillOpacity={0.6}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-semibold">Sentiment: {location.sentiment.toFixed(2)}</p>
                  <p>Mentions: {location.count}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default HeatmapView;