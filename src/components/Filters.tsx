import { useState } from 'react';
import type { Period, Filters as FiltersType } from '../types';

interface FiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onRefresh: () => void;
}

const SOURCES = [
  { value: '', label: 'Все источники' },
  { value: 'afisha', label: 'Афиша' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'organic', label: 'Органика' },
  { value: 'partners', label: 'Партнёры' },
  { value: 'other', label: 'Другое' },
];

const PERIODS: { value: Period; label: string }[] = [
  { value: 'today', label: 'Сегодня' },
  { value: '3d', label: '3 дня' },
  { value: '7d', label: 'Неделя' },
  { value: '30d', label: 'Месяц' },
  { value: 'all', label: 'Всё время' },
];

export default function Filters({ filters, onFiltersChange, onRefresh }: FiltersProps) {
  const [showAdminKey, setShowAdminKey] = useState(false);

  const handlePeriodChange = (period: Period) => {
    onFiltersChange({ ...filters, period });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, source: e.target.value || undefined });
  };

  const handleAdminKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, admin_key: e.target.value || undefined });
  };

  const handleReset = () => {
    onFiltersChange({ period: '7d', source: undefined, admin_key: undefined });
  };

  const getFilterSummary = () => {
    const periodLabel = PERIODS.find(p => p.value === filters.period)?.label || '';
    const sourceLabel = SOURCES.find(s => s.value === (filters.source || ''))?.label || 'Все источники';
    return `${periodLabel} · ${sourceLabel}`;
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h1 className="dashboard-title">Статистика 5Chairs</h1>
      </div>

      <div className="filters-controls">
        <div className="period-buttons">
          {PERIODS.map(period => (
            <button
              key={period.value}
              className={`period-btn ${filters.period === period.value ? 'active' : ''}`}
              onClick={() => handlePeriodChange(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <select
            className="source-select"
            value={filters.source || ''}
            onChange={handleSourceChange}
          >
            {SOURCES.map(source => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>

          <button className="refresh-btn" onClick={onRefresh}>
            Обновить
          </button>

          <button className="reset-btn" onClick={handleReset}>
            Сбросить
          </button>
        </div>

        {showAdminKey && (
          <div className="admin-key-row">
            <input
              type="password"
              className="admin-key-input"
              placeholder="Admin Key (опционально)"
              value={filters.admin_key || ''}
              onChange={handleAdminKeyChange}
            />
          </div>
        )}

        <button
          className="toggle-admin-btn"
          onClick={() => setShowAdminKey(!showAdminKey)}
        >
          {showAdminKey ? 'Скрыть' : 'Показать'} admin key
        </button>
      </div>

      <div className="filters-summary">
        {getFilterSummary()}
      </div>
    </div>
  );
}
