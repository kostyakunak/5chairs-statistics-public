import { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import type { FunnelStage } from '../types';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

interface FunnelChartProps {
  title: string;
  stages: FunnelStage[];
}

export default function FunnelChart({ title, stages }: FunnelChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = stages.map(s => s.stage);
    const data = stages.map(s => s.users);
    const colors = stages.map((_, i) => {
      const opacity = 0.9 - (i * 0.08);
      return `rgba(255, 107, 53, ${opacity})`;
    });

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Пользователи',
          data,
          backgroundColor: colors,
          borderColor: '#FF6B35',
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context: any) {
                const index = context.dataIndex;
                const stage = stages[index];
                const pctFromStart = (stage.pct_from_start * 100).toFixed(1);
                const pctFromPrev = (stage.pct_from_prev * 100).toFixed(1);
                return [
                  `Пользователей: ${stage.users.toLocaleString('ru-RU')}`,
                  `От старта: ${pctFromStart}%`,
                  `От предыдущего: ${pctFromPrev}%`,
                ];
              }
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 13,
                weight: 500,
              },
            },
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeInOutQuart',
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stages]);

  return (
    <div className="chart-container funnel-chart">
      <h2 className="chart-title">{title}</h2>
      <p className="chart-subtitle">
        ВОРОНКА СЧИТАЕТСЯ ДО ПЕРВОЙ ОПЛАТЫ. Повторные оплаты и LTV — в отдельном блоке.
      </p>
      <div className="chart-canvas-wrapper funnel-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
