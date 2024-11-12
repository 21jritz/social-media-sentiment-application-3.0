import React, { useState } from 'react';
import { Download, Share2, Bell, Grid, Cloud, FileText } from 'lucide-react';

const DataPresentation: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('dashboards');

  const subTabs = [
    { id: 'dashboards', label: 'Dashboards', icon: Grid },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'heatmaps', label: 'Heatmaps', icon: Cloud },
  ];

  const exportOptions = [
    { format: 'PDF', icon: FileText },
    { format: 'Excel', icon: FileText },
    { format: 'CSV', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b">
        <div className="flex space-x-4">
          {subTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSubTab(id)}
              className={`flex items-center px-4 py-2 border-b-2 -mb-px transition-colors ${
                activeSubTab === id
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Daily Overview', 'Weekly Summary', 'Monthly Report'].map(report => (
          <div key={report} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{report}</h3>
                <p className="text-sm text-gray-500 mt-1">Last updated: 2h ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportOptions.map(({ format, icon: Icon }) => (
            <button
              key={format}
              className="flex items-center justify-center space-x-2 p-4 border rounded-lg hover:bg-gray-50"
            >
              <Icon className="w-5 h-5" />
              <span>Export as {format}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Scheduled Reports</h3>
        <div className="space-y-4">
          {['Daily Summary', 'Weekly Analytics', 'Monthly Overview'].map(report => (
            <div
              key={report}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{report}</p>
                <p className="text-sm text-gray-500">Next delivery: Tomorrow, 9:00 AM</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">Configure</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataPresentation;