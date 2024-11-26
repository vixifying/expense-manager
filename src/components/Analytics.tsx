import React from 'react';
import type { Expense } from '../types';

const Analytics = ({ expenses }: { expenses: Expense[] }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Expenses by Category</h3>
        <div className="space-y-4">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{category}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">${total.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${(total / Object.values(categoryTotals).reduce((a, b) => a + b, 0)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Expenses</h3>
        <div className="space-y-4">
          {Object.entries(monthlyTotals).map(([month, total]) => (
            <div key={month}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{month}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">${total.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(total / Object.values(monthlyTotals).reduce((a, b) => a + b, 0)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;