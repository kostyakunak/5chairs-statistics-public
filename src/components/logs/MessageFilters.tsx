import { useState } from 'react';
import type { MessageFilters as MessageFiltersType, MessageType } from '../../logsTypes';

interface MessageFiltersProps {
  filters: MessageFiltersType;
  onFiltersChange: (filters: MessageFiltersType) => void;
}

export default function MessageFilters({ filters, onFiltersChange }: MessageFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, user_id: e.target.value || undefined });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, source: e.target.value || undefined });
  };

  const handleMessageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFiltersChange({ ...filters, type: value === 'all' ? undefined : (value as MessageType) });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value || undefined });
  };

  const handleReset = () => {
    onFiltersChange({
      period: filters.period,
      module: undefined,
      status: undefined,
      type: undefined,
      source: undefined,
      user_id: undefined,
      search: undefined,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="filters-container" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="filters-header flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Message Filters</h3>
          <button
            className="text-sm text-orange-600 hover:text-orange-700 underline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced filters
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={filters.user_id || ''}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-md focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              id="source"
              type="text"
              value={filters.source || ''}
              onChange={handleSourceChange}
              placeholder="Enter source"
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-md focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 mb-1">
              Message Type
            </label>
            <select
              id="messageType"
              value={filters.type || 'all'}
              onChange={handleMessageTypeChange}
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-md bg-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="text">Text</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="audio">Audio</option>
              <option value="voice">Voice</option>
              <option value="sticker">Sticker</option>
            </select>
          </div>

          {showAdvanced && (
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                value={filters.search || ''}
                onChange={handleSearchChange}
                placeholder="Search by text"
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-md focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="ml-3">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-md hover:border-orange-500 hover:text-orange-700 transition-colors"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}