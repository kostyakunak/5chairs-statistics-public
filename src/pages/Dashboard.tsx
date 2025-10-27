import { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import KPICard from '../components/KPICard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import FunnelChart from '../components/FunnelChart';
import RepeatClientsBlock from '../components/RepeatClientsBlock';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';
import { fetchStats, mapToCharts } from '../dataApi';
import type { Filters as FiltersType, StatsPayload } from '../types';

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersType>({
    period: (localStorage.getItem('dashboard_period') as FiltersType['period']) || '7d',
    source: undefined,
    admin_key: undefined,
  });

  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStats(filters);
      setStats(data);
    } catch (err) {
      setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [filters]);

  const handleRefresh = () => {
    loadStats();
  };

  useEffect(() => {
    localStorage.setItem('dashboard_period', filters.period);
  }, [filters.period]);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const hasData = stats && (stats.kpis.new_users > 0 || stats.sources.length > 0 || stats.funnel.length > 0 || stats.timeseries.new_users_by_day.length > 0 || stats.timeseries.payments_breakdown_by_day.length > 0);

  if (!stats || !hasData) {
    return (
      <div className="dashboard">
        <Filters filters={filters} onFiltersChange={setFilters} onRefresh={handleRefresh} />
        <EmptyState />
      </div>
    );
  }

  const charts = mapToCharts(stats);

  return (
    <div className="dashboard">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      <Filters filters={filters} onFiltersChange={setFilters} onRefresh={handleRefresh} />

      <div className="kpi-grid">
        <KPICard
          title="Новые пользователи"
          value={stats.kpis.new_users}
          format="number"
          tooltip="Количество новых пользователей за выбранный период"
        />
        <KPICard
          title="Всего пользователей"
          value={stats.kpis.total_users}
          format="number"
          tooltip="Общее количество пользователей за всё время"
        />
        <KPICard
          title="Конверсия до первой оплаты"
          value={stats.kpis.first_purchase_cr}
          format="percent"
          tooltip="Процент пользователей, совершивших первую оплату от старта бота до payment_success"
        />
        <KPICard
          title="Повторные клиенты"
          value={stats.kpis.repeat_share}
          format="percent"
          tooltip="Доля клиентов с двумя и более оплатами за всё время"
        />
      </div>

      <div className="charts-grid">
        <LineChart
          title="Новые пользователи по дням"
          labels={charts.newUsersChart.labels}
          data={charts.newUsersChart.data}
        />

        <BarChart
          title="Источники трафика (Top-5)"
          labels={charts.sourcesChart.labels}
          data={charts.sourcesChart.data}
          hint="Источники трафика определяются по first-click модели (параметр ?start= в ссылке)"
        />
      </div>

      <FunnelChart
        title="Воронка: Путь до первой оплаты"
        stages={stats.funnel}
      />

      <RepeatClientsBlock
        kpis={stats.kpis}
        paymentsData={charts.paymentsChart}
      />
    </div>
  );
}
