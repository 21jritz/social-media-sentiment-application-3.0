import React, { useState } from 'react';
import { Search, Loader2, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import RealTimeMonitor from './RealTimeMonitor';
import EmotionAnalysis from './EmotionAnalysis';
import MetricsOverview from './MetricsOverview';
import DataSourceSelector from './DataSourceSelector';
import AnalyticsTabs from './AnalyticsTabs';
import { dataSourceService } from '../services/dataSourceService';
import { analyzeSentiment } from '../services/sentimentService';
import { SocialMediaPost } from '../types/data';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSources, setSelectedSources] = useState(['twitter', 'facebook', 'instagram']);

  const handleSourceToggle = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const fetchedPosts = await dataSourceService.collectData(query, selectedSources);
      setPosts(fetchedPosts);
      
      setAnalyzing(true);
      await Promise.all(fetchedPosts.map(post => analyzeSentiment(post.content)));
      dataSourceService.updateMetrics(fetchedPosts);

      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze data. Please try again.');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
            className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading || analyzing}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || analyzing}
            className="bg-blue-500 text-white p-2 rounded flex items-center hover:bg-blue-600 disabled:opacity-50"
          >
            {loading || analyzing ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Search className="mr-2" />
            )}
            {loading ? 'Searching...' : analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <DataSourceSelector
          selectedSources={selectedSources}
          onSourceToggle={handleSourceToggle}
        />
      </div>

      <MetricsOverview metrics={dataSourceService.getMetrics()} />
      <RealTimeMonitor />
      
      {posts.length > 0 && !loading && !analyzing && (
        <>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="border-b pb-4">
                  <p className="text-gray-800">{post.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    </p>
                    <p className="text-sm text-gray-500">
                      via {post.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AnalyticsTabs />
        </>
      )}
    </div>
  );
};

export default Dashboard;