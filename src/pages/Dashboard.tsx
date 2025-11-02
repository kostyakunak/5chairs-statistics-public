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
      setError('Error loading data. Please refresh the page.');
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
          <p>Loading data...</p>
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
          title="New Users"
          value={stats.kpis.new_users}
          format="number"
          tooltip="Number of new users for the selected period"
        />
        <KPICard
          title="Total Users"
          value={stats.kpis.total_users}
          format="number"
          tooltip="Total number of users for all time"
        />
        <KPICard
          title="First Purchase Conversion"
          value={stats.kpis.first_purchase_cr}
          format="percent"
          tooltip="Percentage of users who made their first payment from bot start to payment_success"
        />
        <KPICard
          title="Repeat Clients"
          value={stats.kpis.repeat_share}
          format="percent"
          tooltip="Share of clients with two or more payments for all time"
        />
      </div>

      <div className="charts-grid">
        <LineChart
          title="New Users by Day"
          labels={charts.newUsersChart.labels}
          data={charts.newUsersChart.data}
        />

        <BarChart
          title="Traffic Sources (Top-5)"
          labels={charts.sourcesChart.labels}
          data={charts.sourcesChart.data}
          hint="Traffic sources are determined by first-click model (parameter ?start= in the link)"
        />
      </div>

      <FunnelChart
        title="Funnel: Path to First Payment"
        stages={stats.funnel}
      />

      <RepeatClientsBlock
        kpis={stats.kpis}
        paymentsData={charts.paymentsChart}
      />
    </div>
  );
}
