import { useState } from 'react';
import type { MessageItem, MessageType } from '../../logsTypes';

interface MessageListProps {
  messages: MessageItem[];
  onMessageSelect: (message: MessageItem) => void;
  selectedMessageId?: string;
}

export default function MessageList({ messages, onMessageSelect, selectedMessageId }: MessageListProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  const toggleMessageExpansion = (messageUuid: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageUuid)) {
      newExpanded.delete(messageUuid);
    } else {
      newExpanded.add(messageUuid);
    }
    setExpandedMessages(newExpanded);
  };


  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'queued': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-lg">No messages found</p>
      </div>
    );
  }

  return (
    <div className="space-y-0 divide-y divide-gray-200">
      {messages.map((message) => {
        const isExpanded = expandedMessages.has(message.message_uuid);
        const isSelected = selectedMessageId === message.message_uuid;

        return (
          <div
            key={message.message_uuid}
            className={`bg-white cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
              isSelected
                ? 'bg-orange-50 border-l-4 border-orange-500'
                : 'border-l-4 border-transparent'
            }`}
            onClick={() => onMessageSelect(message)}
          >
            <div className="p-4">
              {/* Primary content display */}
              <div className="mb-3">
                {message.rendered_message.text && (
                  <div className="text-gray-900 leading-relaxed text-sm sm:text-base mb-2">
                    {isExpanded
                      ? message.rendered_message.text
                      : message.rendered_message.text.length > 150
                        ? `${message.rendered_message.text.slice(0, 150)}...`
                        : message.rendered_message.text
                    }
                  </div>
                )}

                {(message.rendered_message.photo || message.rendered_message.document) && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {message.rendered_message.photo && (
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                        <span>📷</span>
                        <span>Photo</span>
                      </div>
                    )}
                    {message.rendered_message.document && (
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                        <span>📄</span>
                        <span>Document</span>
                      </div>
                    )}
                  </div>
                )}

                {message.rendered_message.text && message.rendered_message.text.length > 150 && (
                  <button
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMessageExpansion(message.message_uuid);
                    }}
                  >
                    {isExpanded ? 'Collapse' : 'Show more'}
                  </button>
                )}
              </div>

              {/* Metadata row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                  <span>User: {message.user_id}</span>
                  {message.source && <span>Source: {message.source}</span>}
                </div>
                <div>{new Date(message.planned_at).toLocaleString('en-US')}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}