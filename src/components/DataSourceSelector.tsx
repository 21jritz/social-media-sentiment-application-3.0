import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

interface Props {
  selectedSources: string[];
  onSourceToggle: (source: string) => void;
}

const DataSourceSelector: React.FC<Props> = ({ selectedSources, onSourceToggle }) => {
  const sources = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' }
  ];

  return (
    <div className="flex space-x-4">
      {sources.map(({ id, name, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => onSourceToggle(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            selectedSources.includes(id)
              ? `bg-gray-100 ${color}`
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default DataSourceSelector;