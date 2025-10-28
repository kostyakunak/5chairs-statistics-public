import { useState } from 'react';
import type { MessageDetails as MessageDetailsType } from '../../logsTypes';

interface MessageDetailsProps {
  message: MessageDetailsType | null;
}

export default function MessageDetails({ message }: MessageDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'request' | 'response' | 'versions' | 'events'>('overview');

  if (!message) {
    return (
      <div className="message-details-empty">
        <p>Выберите сообщение для просмотра деталей</p>
      </div>
    );
  }

  const renderMessageContent = (renderedMessage: any) => {
    if (renderedMessage.text) {
      return (
        <div className="message-content-text">
          <h4>Текст сообщения:</h4>
          <pre className="text-content">{renderedMessage.text}</pre>
        </div>
      );
    }

    if (renderedMessage.photo) {
      return (
        <div className="message-content-media">
          <h4>Медиа:</h4>
          <p>📷 Фото: {renderedMessage.photo}</p>
        </div>
      );
    }

    if (renderedMessage.document) {
      return (
        <div className="message-content-media">
          <h4>Медиа:</h4>
          <p>📄 Документ: {renderedMessage.document}</p>
        </div>
      );
    }

    return (
      <div className="message-content-unknown">
        <p>Неизвестный тип контента</p>
      </div>
    );
  };

  return (
    <div className="message-details">
      <div className="details-header">
        <h3>Детали сообщения</h3>
        <div className="message-id">UUID: {message.message_uuid}</div>
      </div>

      <div className="details-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Обзор
        </button>
        <button
          className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Запрос
        </button>
        <button
          className={`tab-btn ${activeTab === 'response' ? 'active' : ''}`}
          onClick={() => setActiveTab('response')}
        >
          Ответ
        </button>
        {message.versions && message.versions.length > 0 && (
          <button
            className={`tab-btn ${activeTab === 'versions' ? 'active' : ''}`}
            onClick={() => setActiveTab('versions')}
          >
            Версии ({message.versions.length})
          </button>
        )}
        {message.events && message.events.length > 0 && (
          <button
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            События ({message.events.length})
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
                <label>Модуль:</label>
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
                <label>Тип:</label>
                <span>{message.type}</span>
              </div>
              <div className="info-item">
                <label>Статус:</label>
                <span className={`status-${message.status}`}>{message.status}</span>
              </div>
              <div className="info-item">
                <label>Запланировано:</label>
                <span>{new Date(message.planned_at).toLocaleString('ru-RU')}</span>
              </div>
              {message.sent_at && (
                <div className="info-item">
                  <label>Отправлено:</label>
                  <span>{new Date(message.sent_at).toLocaleString('ru-RU')}</span>
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
            <h4>Тело запроса:</h4>
            <pre className="json-content">
              {message.request_body || 'Нет данных'}
            </pre>
          </div>
        )}

        {activeTab === 'response' && (
          <div className="response-tab">
            <h4>Тело ответа:</h4>
            <pre className="json-content">
              {message.response_body || 'Нет данных'}
            </pre>
            {message.http_status && (
              <div className="http-status">
                <label>HTTP статус:</label>
                <span>{message.http_status}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'versions' && message.versions && (
          <div className="versions-tab">
            <h4>История версий:</h4>
            {message.versions.map((version, index) => (
              <div key={index} className="version-item">
                <div className="version-header">
                  <span className="version-number">Версия {version.version}</span>
                  <span className="version-date">
                    {new Date(version.modified_at).toLocaleString('ru-RU')}
                  </span>
                </div>
                {renderMessageContent(version.rendered_message)}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && message.events && (
          <div className="events-tab">
            <h4>События:</h4>
            {message.events.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-header">
                  <span className="event-type">{event.event_type}</span>
                  <span className="event-date">
                    {new Date(event.occurred_at).toLocaleString('ru-RU')}
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