import { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import type { KPI, PaymentsBreakdownPoint } from '../types';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

interface RepeatClientsBlockProps {
  kpis: KPI;
  paymentsData: {
    labels: string[];
    newData: number[];
    repeatData: number[];
  };
}

export default function RepeatClientsBlock({ kpis, paymentsData }: RepeatClientsBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: paymentsData.labels,
        datasets: [
          {
            label: 'Новые оплаты',
            data: paymentsData.newData,
            backgroundColor: 'rgba(255, 107, 53, 0.8)',
            borderColor: '#FF6B35',
            borderWidth: 2,
            borderRadius: 6,
          },
          {
            label: 'Повторные оплаты',
            data: paymentsData.repeatData,
            backgroundColor: 'rgba(52, 168, 83, 0.8)',
            borderColor: '#34A853',
            borderWidth: 2,
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 13,
                weight: 500,
              },
              padding: 15,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          x: {
            stacked: false,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [paymentsData]);

  return (
    <div className="repeat-clients-block">
      <h2 className="section-title">Повторные клиенты</h2>

      <div className="repeat-kpis">
        <div className="repeat-kpi-card">
          <div className="repeat-kpi-label">Доля повторных клиентов</div>
          <div className="repeat-kpi-value">
            {(kpis.repeat_share * 100).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%
          </div>
          <div className="repeat-kpi-hint">Клиенты с ≥2 оплатами</div>
        </div>

        {kpis.aov && (
          <div className="repeat-kpi-card">
            <div className="repeat-kpi-label">Средний чек (AOV)</div>
            <div className="repeat-kpi-value">
              {kpis.aov.toLocaleString('ru-RU')} {import.meta.env.VITE_CURRENCY_SYMBOL || '₽'}
            </div>
            <div className="repeat-kpi-hint">Среднее значение оплаты</div>
          </div>
        )}

        {kpis.ltv_avg && (
          <div className="repeat-kpi-card">
            <div className="repeat-kpi-label">Средний LTV</div>
            <div className="repeat-kpi-value">
              {kpis.ltv_avg.toLocaleString('ru-RU')} {import.meta.env.VITE_CURRENCY_SYMBOL || '₽'}
            </div>
            <div className="repeat-kpi-hint">Сумма оплат на пользователя</div>
          </div>
        )}
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Новые vs Повторные оплаты по дням</h3>
        <div className="chart-canvas-wrapper">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
