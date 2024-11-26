import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import type { Expense } from '../../types';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  expenses: Expense[];
  type: 'line' | 'doughnut' | 'bar';
  title: string;
}

const ExpenseChart = ({ expenses, type, title }: ChartData) => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#374151';

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: title,
        color: textColor,
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        ticks: { color: textColor },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
      x: {
        ticks: { color: textColor },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
    } : undefined,
  };

  const lineData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#6366f1',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
        ],
      },
    ],
  };

  const barData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Category Expenses',
        data: Object.values(categoryData),
        backgroundColor: '#6366f1',
      },
    ],
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line options={options} data={lineData} />;
      case 'doughnut':
        return <Doughnut options={options} data={doughnutData} />;
      case 'bar':
        return <Bar options={options} data={barData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="h-[300px]">
        {renderChart()}
      </div>
    </div>
  );
};

export default ExpenseChart;