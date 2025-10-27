export type MessageModule = 'user_bot' | 'automation' | 'admin_bot';
export type MessageStatus = 'queued' | 'sent' | 'failed' | 'canceled';
export type MessageType = 'text' | 'photo' | 'video' | 'document' | 'invoice' | 'media_group' | 'audio' | 'voice' | 'sticker';

export type MessagePeriod = 'today' | '3d' | '7d' | '30d' | 'all';

export type TelegramEntity = {
  offset: number;
  length: number;
  type: 'bold' | 'italic' | 'code' | 'pre' | 'text_link' | 'mention' | 'hashtag' | 'url';
  url?: string;
};

export type InlineButton = {
  text: string;
  url?: string;
  callback_data?: string;
};

export type RenderedMessage = {
  method: string;
  chat_id: string;
  text?: string;
  caption?: string;
  entities?: TelegramEntity[];
  reply_markup?: {
    inline_keyboard: InlineButton[][];
  };
  photo?: string;
  video?: string;
  document?: string;
  audio?: string;
  voice?: string;
  sticker?: string;
  media?: Array<{
    type: string;
    media: string;
    caption?: string;
  }>;
  title?: string;
  description?: string;
  payload?: string;
  provider_token?: string;
  currency?: string;
  prices?: Array<{ label: string; amount: number }>;
};

export type MessageItem = {
  message_uuid: string;
  bot_id: string;
  module: MessageModule;
  user_id: string;
  chat_id: string;
  username?: string;
  source?: string;
  template_id?: string;
  type: MessageType;
  status: MessageStatus;
  planned_at: string;
  sent_at?: string;
  failed_at?: string;
  telegram_message_id?: number;
  rendered_message: RenderedMessage;
  content_hash: string;
  http_status?: number;
};

export type MessageDetails = MessageItem & {
  request_body?: string;
  response_body?: string;
  versions?: Array<{
    version: number;
    modified_at: string;
    rendered_message: RenderedMessage;
  }>;
  events?: Array<{
    event_type: 'deleted' | 'pinned' | 'unpinned' | 'edited';
    occurred_at: string;
    details?: string;
  }>;
};

export type MessageFilters = {
  period: MessagePeriod;
  module?: MessageModule | 'all';
  status?: MessageStatus | 'all';
  type?: MessageType | 'all';
  source?: string;
  user_id?: string;
  search?: string;
};

export type MessagesResponse = {
  items: MessageItem[];
  nextCursor?: string;
  total: number;
};
