import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSentimentStore } from '../../store/sentimentStore';
import { dataSourceService } from '../../services/dataSourceService';
import MetricsOverview from './MetricsOverview';
import RealTimeMonitor from './RealTimeMonitor';
import AnalyticsTabs from './AnalyticsTabs';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { startMonitoring, stopMonitoring } = useSentimentStore();

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const data = await dataSourceService.collectData(query, ['twitter', 'facebook']);
      startMonitoring();
      toast.success('Analysis started successfully');
    } catch (error) {
      toast.error('Failed to start analysis');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded flex items-center hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <Search className="mr-2" />
          )}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      <MetricsOverview />
      <RealTimeMonitor />
      <AnalyticsTabs />
    </div>
  );
};

export default Dashboard;