import { useState, useEffect, useCallback } from 'react';
import type { MessageFilters, MessageItem } from '../logsTypes';
import { fetchMessages } from '../logsApi';
import MessageFilters from '../components/logs/MessageFilters';
import MessageList from '../components/logs/MessageList';
import MessageDetails from '../components/logs/MessageDetails';
import ErrorBanner from '../components/ErrorBanner';

export default function MessagesLog() {
  const [filters, setFilters] = useState<MessageFilters>({
    period: '7d',
    module: 'all',
    status: 'all',
    type: 'all',
  });

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [selectedMessageUuid, setSelectedMessageUuid] = useState<string | null>(null);
  const [liveMode, setLiveMode] = useState(false);

  const loadMessages = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const cursor = reset ? undefined : nextCursor;
      const response = await fetchMessages(filters, cursor);

      if (reset) {
        setMessages(response.items);
      } else {
        setMessages(prev => [...prev, ...response.items]);
      }

      setNextCursor(response.nextCursor);
    } catch (err) {
      setError('Error loading messages. Please refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, nextCursor]);

  useEffect(() => {
    loadMessages(true);
  }, [filters]);

  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      loadMessages(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [liveMode, loadMessages]);

  const handleRefresh = () => {
    loadMessages(true);
  };

  const handleLoadMore = () => {
    if (nextCursor && !loading) {
      loadMessages(false);
    }
  };

  const handleShowDetails = (message: MessageItem) => {
    setSelectedMessageUuid(message.message_uuid);
  };

  const handleCloseDetails = () => {
    setSelectedMessageUuid(null);
  };

  const handleLiveModeToggle = () => {
    setLiveMode(!liveMode);
  };

  return (
    <div className="messages-log-page">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      <MessageFilters
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={handleRefresh}
        liveMode={liveMode}
        onLiveModeToggle={handleLiveModeToggle}
      />

      {loading && messages.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      ) : (
        <MessageList
          messages={messages}
          onLoadMore={handleLoadMore}
          hasMore={!!nextCursor}
          loading={loading}
          onShowDetails={handleShowDetails}
        />
      )}

      {selectedMessageUuid && (
        <div className="details-overlay" onClick={handleCloseDetails}>
          <div className="details-panel-wrapper" onClick={(e) => e.stopPropagation()}>
            <MessageDetails
              messageUuid={selectedMessageUuid}
              onClose={handleCloseDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}
