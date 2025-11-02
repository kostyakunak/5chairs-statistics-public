import { useState, useEffect } from 'react';
import { fetchMessageDetails } from '../../logsApi';
import type { MessageDetails as MessageDetailsType } from '../../logsTypes';

interface MessageDetailsProps {
  messageUuid: string;
  onClose: () => void;
}

export default function MessageDetails({ messageUuid, onClose }: MessageDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'request' | 'response' | 'versions' | 'events'>('overview');
  const [message, setMessage] = useState<MessageDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMessageDetails(messageUuid);
        setMessage(data);
      } catch (err) {
        setError('Failed to load message details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, [messageUuid]);

  if (loading) {
    return (
      <div className="message-details-empty">
        <p>Loading message details...</p>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="message-details-empty">
        <p>{error || 'Message not found'}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    );
  }

  const renderMessageContent = (renderedMessage: any) => {
    if (renderedMessage.text) {
      return (
        <div className="message-content-text">
          <h4>Message Text:</h4>
          <pre className="text-content">{renderedMessage.text}</pre>
        </div>
      );
    }

    if (renderedMessage.photo) {
      return (
        <div className="message-content-media">
          <h4>Media:</h4>
          <p>📷 Photo: {renderedMessage.photo}</p>
        </div>
      );
    }

    if (renderedMessage.document) {
      return (
        <div className="message-content-media">
          <h4>Media:</h4>
          <p>📄 Document: {renderedMessage.document}</p>
        </div>
      );
    }

    return (
      <div className="message-content-unknown">
        <p>Unknown content type</p>
      </div>
    );
  };

  return (
    <div className="message-details">
      <div className="details-header">
        <h3>Message Details</h3>
        <div className="message-id">UUID: {message.message_uuid}</div>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      <div className="details-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Request
        </button>
        <button
          className={`tab-btn ${activeTab === 'response' ? 'active' : ''}`}
          onClick={() => setActiveTab('response')}
        >
          Response
        </button>
        {message.versions && message.versions.length > 0 && (
          <button
            className={`tab-btn ${activeTab === 'versions' ? 'active' : ''}`}
            onClick={() => setActiveTab('versions')}
          >
            Versions ({message.versions.length})
          </button>
        )}
        {message.events && message.events.length > 0 && (
          <button
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events ({message.events.length})
          </button>
        )}
      </div>

      <div className="details-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="info-grid">
              <div className="info-item">
                <label>Bot ID:</label>
                <span>{message.bot_id}</span>
              </div>
              <div className="info-item">
                <label>Module:</label>
                <span>{message.module}</span>
              </div>
              <div className="info-item">
                <label>User ID:</label>
                <span>{message.user_id}</span>
              </div>
              <div className="info-item">
                <label>Chat ID:</label>
                <span>{message.chat_id}</span>
              </div>
              <div className="info-item">
                <label>Type:</label>
                <span>{message.type}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-${message.status}`}>{message.status}</span>
              </div>
              <div className="info-item">
                <label>Planned:</label>
                <span>{new Date(message.planned_at).toLocaleString('en-US')}</span>
              </div>
              {message.sent_at && (
                <div className="info-item">
                  <label>Sent:</label>
                  <span>{new Date(message.sent_at).toLocaleString('en-US')}</span>
                </div>
              )}
              {message.telegram_message_id && (
                <div className="info-item">
                  <label>Telegram ID:</label>
                  <span>{message.telegram_message_id}</span>
                </div>
              )}
            </div>

            {renderMessageContent(message.rendered_message)}
          </div>
        )}

        {activeTab === 'request' && (
          <div className="request-tab">
            <h4>Request Body:</h4>
            <pre className="json-content">
              {message.request_body || 'No data'}
            </pre>
          </div>
        )}

        {activeTab === 'response' && (
          <div className="response-tab">
            <h4>Response Body:</h4>
            <pre className="json-content">
              {message.response_body || 'No data'}
            </pre>
            {message.http_status && (
              <div className="http-status">
                <label>HTTP Status:</label>
                <span>{message.http_status}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'versions' && message.versions && (
          <div className="versions-tab">
            <h4>Version History:</h4>
            {message.versions.map((version, index) => (
              <div key={index} className="version-item">
                <div className="version-header">
                  <span className="version-number">Version {version.version}</span>
                  <span className="version-date">
                    {new Date(version.modified_at).toLocaleString('en-US')}
                  </span>
                </div>
                {renderMessageContent(version.rendered_message)}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && message.events && (
          <div className="events-tab">
            <h4>Events:</h4>
            {message.events.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-header">
                  <span className="event-type">{event.event_type}</span>
                  <span className="event-date">
                    {new Date(event.occurred_at).toLocaleString('en-US')}
                  </span>
                </div>
                {event.details && (
                  <div className="event-details">{event.details}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}