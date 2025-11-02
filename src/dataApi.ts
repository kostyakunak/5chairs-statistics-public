// API module for loading 5Chairs statistics
// IMPORTANT: FUNNEL IS COUNTED UNTIL FIRST PAYMENT. Repeat payments and LTV are in a separate block.

import type { Filters, StatsPayload, FunnelStage, TimeseriesPoint, PaymentsBreakdownPoint, SourceItem } from './types';

// TODO: replace with real REST call
// Example of future request:
// const res = await fetch(`/admin/stats?period=${filters.period}&source=${filters.source||''}`, {
//   headers: { 'X-Admin-Key': filters.admin_key || '' }
// });
// const data: StatsPayload = await res.json();
// return data;

export async function fetchStats(filters: Filters): Promise<StatsPayload> {
  // Always use mock data for demonstration
  // Simulate a small delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockData(filters);
  
  // Commented out - use for real API:
  // try {
  //   const params = new URLSearchParams();
  //   params.set('period', filters.period);
  //   if (filters.source) params.set('source', filters.source);

  //   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats?` + params.toString(), {
  //     headers: { 'X-Admin-Key': import.meta.env.VITE_ADMIN_KEY }
  //   });
  //   if (!res.ok) {
  //     throw new Error(`API error ${res.status}`);
  //   }
  //   const data: StatsPayload = await res.json();
  //   return data;
  // } catch (error) {
  //   console.warn('Failed to fetch real stats, falling back to mock data:', error);
  //   return generateMockData(filters);
  // }
}

function generateMockData(filters: Filters): StatsPayload {
  const periodDays = getPeriodDays(filters.period);

  // FUNNEL: methodology - counted until first purchase
  // Each stage: user reached it before the moment of first payment
  const funnelStages: FunnelStage[] = [
    { stage: 'Bot Start', users: 1000, pct_from_start: 1.0, pct_from_prev: 1.0 },
    { stage: 'Form Started', users: 850, pct_from_start: 0.85, pct_from_prev: 0.85 },
    { stage: 'Form Completed', users: 800, pct_from_start: 0.80, pct_from_prev: 0.94 },
    { stage: 'Menu Opened', users: 750, pct_from_start: 0.75, pct_from_prev: 0.94 },
    { stage: 'Time Search', users: 550, pct_from_start: 0.55, pct_from_prev: 0.73 },
    { stage: 'Request Sent', users: 400, pct_from_start: 0.40, pct_from_prev: 0.73 },
    { stage: 'Payment Pre-menu', users: 350, pct_from_start: 0.35, pct_from_prev: 0.88 },
    { stage: 'Payment Window Opened', users: 280, pct_from_start: 0.28, pct_from_prev: 0.80 },
    { stage: 'Payment Success', users: 120, pct_from_start: 0.12, pct_from_prev: 0.43 },
  ];

  const sources: SourceItem[] = [
    { source: 'afisha', users: 350 },
    { source: 'instagram', users: 280 },
    { source: 'facebook', users: 180 },
    { source: 'organic', users: 120 },
    { source: 'partners', users: 50 },
    { source: 'other', users: 20 },
  ].filter(s => !filters.source || s.source === filters.source)
   .sort((a, b) => b.users - a.users);

  const newUsersByDay: TimeseriesPoint[] = [];
  const paymentsBreakdown: PaymentsBreakdownPoint[] = [];

  for (let i = 0; i < periodDays; i++) {
    const date = getDateString(i, periodDays);
    const baseUsers = 30 + Math.floor(Math.random() * 20);
    newUsersByDay.push({ date, value: baseUsers });

    const newPayments = Math.floor(baseUsers * 0.12);
    const repeatPayments = Math.floor(newPayments * 0.3);
    paymentsBreakdown.push({ date, new: newPayments, repeat: repeatPayments });
  }

  const totalUsers = 5420;
  const newUsers = newUsersByDay.reduce((sum, p) => sum + p.value, 0);
  const firstPurchaseCr = 0.12;
  const repeatShare = 0.28;
  const aov = 95;
  const ltvAvg = 180;

  return {
    kpis: {
      new_users: newUsers,
      total_users: totalUsers,
      first_purchase_cr: firstPurchaseCr,
      repeat_share: repeatShare,
      aov,
      ltv_avg: ltvAvg,
    },
    timeseries: {
      new_users_by_day: newUsersByDay,
      payments_breakdown_by_day: paymentsBreakdown,
    },
    sources,
    funnel: funnelStages,
  };
}

function getPeriodDays(period: string): number {
  switch (period) {
    case 'today': return 1;
    case '3d': return 3;
    case '7d': return 7;
    case '30d': return 30;
    case 'all': return 30;
    default: return 7;
  }
}

function getDateString(daysAgo: number, totalDays: number): string {
  const now = new Date();
  const warsawDate = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Warsaw"}));
  warsawDate.setDate(warsawDate.getDate() - (totalDays - daysAgo - 1));
  return warsawDate.toISOString().split('T')[0];
}

export function mapToCharts(stats: StatsPayload) {
  return {
    newUsersChart: {
      labels: stats.timeseries.new_users_by_day.map(p => formatDate(p.date, stats.timeseries.new_users_by_day.length)),
      data: stats.timeseries.new_users_by_day.map(p => p.value),
    },
    sourcesChart: (() => {
      const top5 = stats.sources.slice(0, 5);
      const others = stats.sources.slice(5);
      const otherSum = others.reduce((sum, s) => sum + s.users, 0);
      const labels = top5.map(s => capitalizeSource(s.source));
      const data = top5.map(s => s.users);
      if (otherSum > 0) {
        labels.push('Other');
        data.push(otherSum);
      }
      return { labels, data };
    })(),
    funnelChart: {
      labels: stats.funnel.map(f => f.stage),
      data: stats.funnel.map(f => f.users),
      percents: stats.funnel.map(f => f.pct_from_start),
    },
    paymentsChart: {
      labels: stats.timeseries.payments_breakdown_by_day.map(p => formatDate(p.date, stats.timeseries.payments_breakdown_by_day.length)),
      newData: stats.timeseries.payments_breakdown_by_day.map(p => p.new),
      repeatData: stats.timeseries.payments_breakdown_by_day.map(p => p.repeat),
    },
  };
}

function formatDate(dateStr: string, totalDays: number): string {
  const date = new Date(dateStr + 'T00:00:00');
  const warsawDate = new Date(date.toLocaleString("en-US", {timeZone: "Europe/Warsaw"}));
  const day = warsawDate.getDate().toString().padStart(2, '0');
  const month = (warsawDate.getMonth() + 1).toString().padStart(2, '0');
  if (totalDays <= 30) {
    return `${day}.${month}`;
  } else {
    const year = (warsawDate.getFullYear() % 100).toString().padStart(2, '0');
    return `${day}.${month}.${year}`;
  }
}

function capitalizeSource(source: string): string {
  const names: Record<string, string> = {
    afisha: 'Afisha',
    instagram: 'Instagram',
    facebook: 'Facebook',
    organic: 'Organic',
    partners: 'Partners',
    other: 'Other',
  };
  return names[source] || source;
}
