import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchExpenses = () => api.get('/expenses');
export const createExpense = (expense: any) => api.post('/expenses', expense);
export const updateExpense = (id: string, expense: any) => api.patch(`/expenses/${id}`, expense);
export const deleteExpense = (id: string) => api.delete(`/expenses/${id}`);

export const fetchIncomes = () => api.get('/incomes');
export const createIncome = (income: any) => api.post('/incomes', income);
export const updateIncome = (id: string, income: any) => api.patch(`/incomes/${id}`, income);
export const deleteIncome = (id: string) => api.delete(`/incomes/${id}`);