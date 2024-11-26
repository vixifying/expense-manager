import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../types';
import * as api from '../services/api';
import toast from 'react-hot-toast';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    const response = await api.fetchExpenses();
    return response.data;
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense: Omit<Expense, 'id'>) => {
    const response = await api.createExpense(expense);
    return response.data;
  }
);

export const updateExpenseAsync = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, expense }: { id: string; expense: Expense }) => {
    const response = await api.updateExpense(id, expense);
    return response.data;
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string) => {
    await api.deleteExpense(id);
    return id;
  }
);

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
        toast.error('Failed to fetch expenses');
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        toast.success('Expense added successfully');
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create expense';
        toast.error('Failed to create expense');
      })
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(expense => expense._id === action.payload._id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
        toast.success('Expense updated successfully');
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(expense => expense._id !== action.payload);
        toast.success('Expense deleted successfully');
      });
  },
});

export default expenseSlice.reducer;