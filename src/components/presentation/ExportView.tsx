import React from 'react';
import { FileText, Download, Share2 } from 'lucide-react';

const ExportView: React.FC = () => {
  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: FileText },
    { id: 'excel', label: 'Excel Spreadsheet', icon: FileText },
    { id: 'csv', label: 'CSV Data', icon: FileText }
  ];

  const handleExport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportFormats.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleExport(id)}
              className="flex items-center justify-center space-x-2 p-4 border rounded-lg hover:bg-gray-50"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Reports</h2>
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
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportView;