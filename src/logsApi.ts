import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { MessageFilters, MessagesResponse, MessageDetails, MessageItem, MessageModule, MessageStatus, MessageType } from './logsTypes';

dayjs.extend(utc);
dayjs.extend(timezone);

const MOCK_MESSAGES_COUNT = 100;

const MODULES: MessageModule[] = ['user_bot', 'automation', 'admin_bot'];
const STATUSES: MessageStatus[] = ['sent', 'sent', 'sent', 'queued', 'failed', 'canceled'];
const TYPES: MessageType[] = ['text', 'text', 'text', 'photo', 'video', 'document', 'invoice', 'media_group'];
const SOURCES = ['instagram', 'telegram', 'website', 'referral', 'organic', 'ads'];
const TEMPLATES = ['booking_confirmed', 'reminder_24h', 'payment_invoice', 'welcome', 'promo'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsername(): string {
  const prefixes = ['user', 'client', 'guest', 'member'];
  return `${getRandomItem(prefixes)}${Math.floor(Math.random() * 10000)}`;
}

function generateMockMessage(index: number): MessageItem {
  const daysAgo = Math.floor(Math.random() * 7);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);

  const planned = dayjs().subtract(daysAgo, 'day').subtract(hoursAgo, 'hour').subtract(minutesAgo, 'minute');
  const status = getRandomItem(STATUSES);
  const type = getRandomItem(TYPES);
  const module = getRandomItem(MODULES);

  const userId = `${100000 + Math.floor(Math.random() * 900000)}`;
  const chatId = userId;
  const username = Math.random() > 0.3 ? generateUsername() : undefined;

  let sent_at: string | undefined;
  let failed_at: string | undefined;

  if (status === 'sent') {
    sent_at = planned.add(Math.floor(Math.random() * 60), 'second').toISOString();
  } else if (status === 'failed') {
    failed_at = planned.add(Math.floor(Math.random() * 60), 'second').toISOString();
  }

  const rendered_message: any = {
    method: type === 'text' ? 'sendMessage' : `send${type.charAt(0).toUpperCase() + type.slice(1)}`,
    chat_id: chatId,
  };

  const texts = [
    'Привет, *${name}*! Ваш слот подтвержден:\n27.10 14:00',
    'Напоминание о записи через 24 часа',
    'Спасибо за оплату! Ждем вас 🎉',
    'Специальное предложение только для вас',
    'Ваш заказ готов к получению',
  ];

  if (type === 'text') {
    const text = getRandomItem(texts);
    rendered_message.text = text;

    if (text.includes('*')) {
      rendered_message.entities = [
        { offset: text.indexOf('*') + 1, length: 6, type: 'bold' }
      ];
    }

    if (Math.random() > 0.6) {
      rendered_message.reply_markup = {
        inline_keyboard: [[
          { text: 'Открыть', url: 'https://5chairs.ru/booking' },
          { text: 'Отменить', callback_data: 'cancel_booking' }
        ]]
      };
    }
  } else if (type === 'photo') {
    rendered_message.photo = `https://picsum.photos/800/600?random=${index}`;
    rendered_message.caption = 'Ваша бронь подтверждена';
    rendered_message.entities = [{ offset: 0, length: 4, type: 'bold' }];
  } else if (type === 'video') {
    rendered_message.video = `https://example.com/video_${index}.mp4`;
    rendered_message.caption = 'Обучающее видео';
  } else if (type === 'document') {
    rendered_message.document = `https://example.com/doc_${index}.pdf`;
    rendered_message.caption = 'Ваша квитанция';
  } else if (type === 'invoice') {
    rendered_message.title = 'Оплата услуги';
    rendered_message.description = 'Бронирование на 27.10 14:00';
    rendered_message.payload = `invoice_${index}`;
    rendered_message.currency = 'RUB';
    rendered_message.prices = [{ label: 'Стрижка', amount: 150000 }];
  } else if (type === 'media_group') {
    rendered_message.media = [
      { type: 'photo', media: `https://picsum.photos/800/600?random=${index}a`, caption: 'Фото 1' },
      { type: 'photo', media: `https://picsum.photos/800/600?random=${index}b`, caption: 'Фото 2' },
    ];
  }

  return {
    message_uuid: `msg-${index}-${Date.now()}`,
    bot_id: 'bot_5chairs_main',
    module,
    user_id: userId,
    chat_id: chatId,
    username,
    source: Math.random() > 0.4 ? getRandomItem(SOURCES) : undefined,
    template_id: Math.random() > 0.3 ? getRandomItem(TEMPLATES) : undefined,
    type,
    status,
    planned_at: planned.toISOString(),
    sent_at,
    failed_at,
    telegram_message_id: status === 'sent' ? Math.floor(Math.random() * 1000000) : undefined,
    rendered_message,
    content_hash: `hash_${index}_${Date.now()}`,
    http_status: status === 'sent' ? 200 : status === 'failed' ? 400 : undefined,
  };
}

let MOCK_MESSAGES: MessageItem[] = [];

function initMockMessages() {
  if (MOCK_MESSAGES.length === 0) {
    MOCK_MESSAGES = Array.from({ length: MOCK_MESSAGES_COUNT }, (_, i) => generateMockMessage(i));
    MOCK_MESSAGES.sort((a, b) => new Date(b.planned_at).getTime() - new Date(a.planned_at).getTime());
  }
}

function applyFilters(messages: MessageItem[], filters: MessageFilters): MessageItem[] {
  let filtered = [...messages];

  if (filters.period !== 'all') {
    const now = dayjs();
    let cutoff: dayjs.Dayjs;

    switch (filters.period) {
      case 'today':
        cutoff = now.startOf('day');
        break;
      case '3d':
        cutoff = now.subtract(3, 'day');
        break;
      case '7d':
        cutoff = now.subtract(7, 'day');
        break;
      case '30d':
        cutoff = now.subtract(30, 'day');
        break;
      default:
        cutoff = now.subtract(7, 'day');
    }

    filtered = filtered.filter(msg => dayjs(msg.planned_at).isAfter(cutoff));
  }

  if (filters.module && filters.module !== 'all') {
    filtered = filtered.filter(msg => msg.module === filters.module);
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(msg => msg.status === filters.status);
  }

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(msg => msg.type === filters.type);
  }

  if (filters.source) {
    filtered = filtered.filter(msg => msg.source?.toLowerCase().includes(filters.source!.toLowerCase()));
  }

  if (filters.user_id) {
    filtered = filtered.filter(msg =>
      msg.user_id.includes(filters.user_id!) ||
      msg.username?.toLowerCase().includes(filters.user_id!.toLowerCase())
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(msg => {
      const text = msg.rendered_message.text || msg.rendered_message.caption || '';
      return text.toLowerCase().includes(searchLower);
    });
  }

  return filtered;
}

export async function fetchMessages(
  filters: MessageFilters,
  cursor?: string
): Promise<MessagesResponse> {
  initMockMessages();

  await new Promise(resolve => setTimeout(resolve, 300));

  const PAGE_SIZE = 20;
  const cursorIndex = cursor ? parseInt(cursor) : 0;

  const filtered = applyFilters(MOCK_MESSAGES, filters);

  const items = filtered.slice(cursorIndex, cursorIndex + PAGE_SIZE);
  const nextCursor = cursorIndex + PAGE_SIZE < filtered.length
    ? String(cursorIndex + PAGE_SIZE)
    : undefined;

  return {
    items,
    nextCursor,
    total: filtered.length,
  };
}

export async function fetchMessageDetails(message_uuid: string): Promise<MessageDetails> {
  initMockMessages();

  await new Promise(resolve => setTimeout(resolve, 200));

  const message = MOCK_MESSAGES.find(m => m.message_uuid === message_uuid);

  if (!message) {
    throw new Error('Message not found');
  }

  const details: MessageDetails = {
    ...message,
    request_body: JSON.stringify(message.rendered_message, null, 2),
    response_body: message.status === 'sent'
      ? JSON.stringify({ ok: true, result: { message_id: message.telegram_message_id } }, null, 2)
      : message.status === 'failed'
      ? JSON.stringify({ ok: false, error_code: 400, description: 'Bad Request: chat not found' }, null, 2)
      : undefined,
    versions: Math.random() > 0.7 ? [
      {
        version: 1,
        modified_at: dayjs(message.planned_at).subtract(1, 'hour').toISOString(),
        rendered_message: message.rendered_message,
      }
    ] : undefined,
    events: Math.random() > 0.8 ? [
      {
        event_type: 'deleted',
        occurred_at: dayjs(message.sent_at || message.planned_at).add(2, 'hour').toISOString(),
        details: 'Deleted by user',
      }
    ] : undefined,
  };

  return details;
}
