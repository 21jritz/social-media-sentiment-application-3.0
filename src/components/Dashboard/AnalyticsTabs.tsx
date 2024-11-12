import React, { useState } from 'react';
import { BarChart2, Users, Globe } from 'lucide-react';

const AnalyticsTabs = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  const tabs = [
    { id: 'sentiment', label: 'Sentiment Analysis', icon: BarChart2 },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'geography', label: 'Geographic', icon: Globe }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="border-b mb-6">
        <div className="flex space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-4 py-2 border-b-2 -mb-px transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 flex items-center justify-center text-gray-500">
        Select data points in the monitor to view detailed analytics
      </div>
    </div>
  );
};

export default AnalyticsTabs;