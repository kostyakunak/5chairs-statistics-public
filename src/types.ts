// Типы данных для дашборда статистики 5Chairs

export type Period = 'today' | '3d' | '7d' | '30d' | 'all';

export type Filters = {
  period: Period;
  source?: string;
  admin_key?: string;
};

export type KPI = {
  new_users: number;
  total_users: number;
  first_purchase_cr: number;
  repeat_share: number;
  aov?: number;
  ltv_avg?: number;
};

export type TimeseriesPoint = {
  date: string;
  value: number;
};

export type PaymentsBreakdownPoint = {
  date: string;
  new: number;
  repeat: number;
};

export type SourceItem = {
  source: string;
  users: number;
};

export type FunnelStage = {
  stage: string;
  users: number;
  pct_from_start: number;
  pct_from_prev: number;
};

export type StatsPayload = {
  kpis: KPI;
  timeseries: {
    new_users_by_day: TimeseriesPoint[];
    payments_breakdown_by_day: PaymentsBreakdownPoint[];
  };
  sources: SourceItem[];
  funnel: FunnelStage[];
};
