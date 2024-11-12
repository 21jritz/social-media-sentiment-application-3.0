import React, { useState } from 'react';
import { Layout, FileText, Bell, Map, Cloud, Download, PieChart } from 'lucide-react';
import DashboardView from './DashboardView';
import ReportsView from './ReportsView';
import AlertsView from './AlertsView';
import HeatmapView from './HeatmapView';
import WordCloudView from './WordCloudView';
import ExportView from './ExportView';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Layout },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'heatmap', label: 'Heatmap', icon: Map },
  { id: 'wordcloud', label: 'Word Cloud', icon: Cloud },
  { id: 'export', label: 'Export', icon: Download }
];

const DataPresentationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6">
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
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'reports' && <ReportsView />}
        {activeTab === 'alerts' && <AlertsView />}
        {activeTab === 'heatmap' && <HeatmapView />}
        {activeTab === 'wordcloud' && <WordCloudView />}
        {activeTab === 'export' && <ExportView />}
      </div>
    </div>
  );
};

export default DataPresentationTabs;