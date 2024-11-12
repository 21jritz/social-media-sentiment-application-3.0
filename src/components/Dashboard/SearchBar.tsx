import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  query: string;
  loading: boolean;
  analyzing: boolean;
  onQueryChange: (query: string) => void;
  onAnalyze: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  loading,
  analyzing,
  onQueryChange,
  onAnalyze
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Enter search query"
        className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading || analyzing}
      />
      <button
        onClick={onAnalyze}
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
    </div>
  );
};

export default SearchBar;