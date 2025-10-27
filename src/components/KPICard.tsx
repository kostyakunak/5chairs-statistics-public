import { useState } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  tooltip?: string;
  format?: 'number' | 'percent' | 'currency';
}

export default function KPICard({ title, value, tooltip, format = 'number' }: KPICardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'percent':
        return `${(val * 100).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%`;
      case 'currency':
        return `${val.toLocaleString('ru-RU')} ₽`;
      case 'number':
      default:
        return val.toLocaleString('ru-RU');
    }
  };

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        {tooltip && (
          <button
            className="tooltip-btn"
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            ?
          </button>
        )}
      </div>
      <div className="kpi-value">{formatValue(value)}</div>
      {showTooltip && tooltip && (
        <div className="kpi-tooltip">{tooltip}</div>
      )}
    </div>
  );
}
