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
            label: 'New Payments',
            data: paymentsData.newData,
            backgroundColor: 'rgba(255, 107, 53, 0.8)',
            borderColor: '#FF6B35',
            borderWidth: 2,
            borderRadius: 6,
          },
          {
            label: 'Repeat Payments',
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
      <h2 className="section-title">Repeat Clients</h2>

      <div className="repeat-kpis">
        <div className="repeat-kpi-card">
          <div className="repeat-kpi-label">Repeat Client Share</div>
          <div className="repeat-kpi-value">
            {(kpis.repeat_share * 100).toLocaleString('en-US', { maximumFractionDigits: 1 })}%
          </div>
          <div className="repeat-kpi-hint">Clients with ≥2 payments</div>
        </div>

        {kpis.aov && (
          <div className="repeat-kpi-card">
            <div className="repeat-kpi-label">Average Order Value (AOV)</div>
            <div className="repeat-kpi-value">
              ${kpis.aov.toLocaleString('en-US')}
            </div>
            <div className="repeat-kpi-hint">Average payment value</div>
          </div>
        )}

        {kpis.ltv_avg && (
          <div className="repeat-kpi-card">
            <div className="repeat-kpi-label">Average LTV</div>
            <div className="repeat-kpi-value">
              ${kpis.ltv_avg.toLocaleString('en-US')}
            </div>
            <div className="repeat-kpi-hint">Total payments per user</div>
          </div>
        )}
      </div>

      <div className="chart-container">
        <h3 className="chart-title">New vs Repeat Payments by Day</h3>
        <div className="chart-canvas-wrapper">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
