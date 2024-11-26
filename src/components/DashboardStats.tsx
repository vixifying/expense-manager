import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet } from 'lucide-react';

const DashboardStats = ({ totalExpenses, totalIncome, balance, categories }: {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  categories: { name: string; amount: number }[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">-${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <CreditCard className="w-6 h-6 text-red-600 dark:text-red-300" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Change</p>
            <div className="flex items-center">
              {balance >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500 dark:text-red-400 mr-1" />
              )}
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {((balance / totalIncome) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;