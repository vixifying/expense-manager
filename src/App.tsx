import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import IncomeList from './components/IncomeList';
import IncomeForm from './components/IncomeForm';
import ExpenseChart from './components/charts/ExpenseChart';
import { ThemeProvider } from './context/ThemeContext';
import { fetchExpenses, createExpense } from './store/expenseSlice';
import { fetchIncomes, createIncome } from './store/incomeSlice';
import type { RootState } from './store/store';
import type { Expense, Income } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const incomes = useSelector((state: RootState) => state.incomes.incomes);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    dispatch(createExpense(newExpense));
  };

  const handleAddIncome = (newIncome: Omit<Income, 'id'>) => {
    dispatch(createIncome(newIncome));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncome - totalExpenses;

  const categories = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(cat => cat.name === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ name: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { name: string; amount: number }[]);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard Overview</h2>
              <DashboardStats
                totalExpenses={totalExpenses}
                totalIncome={totalIncome}
                balance={balance}
                categories={categories}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ExpenseChart
                  expenses={expenses}
                  type="line"
                  title="Monthly Expense Trend"
                />
                <ExpenseChart
                  expenses={expenses}
                  type="doughnut"
                  title="Expense Distribution"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <ExpenseChart
                  expenses={expenses}
                  type="bar"
                  title="Category-wise Expenses"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Expenses</h3>
                  <ExpenseList expenses={expenses.slice(0, 5)} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Income</h3>
                  <IncomeList incomes={incomes.slice(0, 5)} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'expenses' && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Expense Management</h2>
              <div className="mb-6">
                <ExpenseForm onSubmit={handleAddExpense} />
              </div>
              <ExpenseList expenses={expenses} />
            </>
          )}

          {activeTab === 'income' && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Income Management</h2>
              <div className="mb-6">
                <IncomeForm onSubmit={handleAddIncome} />
              </div>
              <IncomeList incomes={incomes} />
            </>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>
              <p className="text-gray-600 dark:text-gray-300">Settings panel coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;