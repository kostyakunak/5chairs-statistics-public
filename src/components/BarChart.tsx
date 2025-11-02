import { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

interface BarChartProps {
  title: string;
  labels: string[];
  data: number[];
  hint?: string;
}

export default function BarChart({ title, labels, data, hint }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const total = data.reduce((sum, val) => sum + val, 0);

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Users',
          data,
          backgroundColor: [
            'rgba(255, 107, 53, 0.9)',
            'rgba(255, 107, 53, 0.75)',
            'rgba(255, 107, 53, 0.6)',
            'rgba(255, 107, 53, 0.45)',
            'rgba(255, 107, 53, 0.3)',
          ],
          borderColor: '#FF6B35',
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
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
                const value = context.parsed.y;
                return `${value.toLocaleString('en-US')} users`;
              }
            },
          },
        },
        scales: {
          y: {
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
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
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
  }, [labels, data]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>
      {hint && <p className="chart-subtitle">{hint}</p>}
      <div className="chart-canvas-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
