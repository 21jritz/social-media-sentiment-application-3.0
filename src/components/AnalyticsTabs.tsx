import React, { useState } from 'react';
import { BarChart2, Users, Globe, MessageSquare, TrendingUp, PieChart } from 'lucide-react';
import TrendAnalysis from './analytics/TrendAnalysis';
import CompetitorAnalysis from './analytics/CompetitorAnalysis';
import CustomerFeedback from './analytics/CustomerFeedback';
import GeolocationAnalysis from './analytics/GeolocationAnalysis';
import DataPresentation from './analytics/DataPresentation';

const tabs = [
  { id: 'trends', label: 'Trend Analysis', icon: TrendingUp },
  { id: 'competitors', label: 'Competitor Analysis', icon: BarChart2 },
  { id: 'feedback', label: 'Customer Feedback', icon: MessageSquare },
  { id: 'geolocation', label: 'Geolocation', icon: Globe },
  { id: 'presentation', label: 'Data Presentation', icon: PieChart },
];

const AnalyticsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="border-b">
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

      <div className="mt-6">
        {activeTab === 'trends' && <TrendAnalysis />}
        {activeTab === 'competitors' && <CompetitorAnalysis />}
        {activeTab === 'feedback' && <CustomerFeedback />}
        {activeTab === 'geolocation' && <GeolocationAnalysis />}
        {activeTab === 'presentation' && <DataPresentation />}
      </div>
    </div>
  );
};

export default AnalyticsTabs;