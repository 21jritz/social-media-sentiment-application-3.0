import React, { useState } from 'react';
import { Bell, Settings, Trash2 } from 'lucide-react';

interface Alert {
  id: string;
  type: 'sentiment' | 'volume' | 'keyword';
  threshold: number;
  condition: string;
  active: boolean;
}

const AlertsView: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'sentiment',
      threshold: 0.8,
      condition: 'above',
      active: true
    },
    {
      id: '2',
      type: 'volume',
      threshold: 100,
      condition: 'above',
      active: true
    }
  ]);

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alert Configuration</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Bell className={`w-5 h-5 ${alert.active ? 'text-blue-500' : 'text-gray-400'}`} />
                <div>
                  <p className="font-medium">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</p>
                  <p className="text-sm text-gray-500">
                    Trigger when {alert.type} is {alert.condition} {alert.threshold}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`px-3 py-1 rounded ${
                    alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {alert.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsView;