import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Income } from '../types';
import * as api from '../services/api';
import toast from 'react-hot-toast';

interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null
};

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async () => {
    const response = await api.fetchIncomes();
    return response.data;
  }
);

export const createIncome = createAsyncThunk(
  'incomes/createIncome',
  async (income: Omit<Income, 'id'>) => {
    const response = await api.createIncome(income);
    return response.data;
  }
);

export const updateIncomeAsync = createAsyncThunk(
  'incomes/updateIncome',
  async ({ id, income }: { id: string; income: Income }) => {
    const response = await api.updateIncome(id, income);
    return response.data;
  }
);

export const deleteIncomeAsync = createAsyncThunk(
  'incomes/deleteIncome',
  async (id: string) => {
    await api.deleteIncome(id);
    return id;
  }
);

export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch incomes';
        toast.error('Failed to fetch incomes');
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
        toast.success('Income added successfully');
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create income';
        toast.error('Failed to create income');
      })
      .addCase(updateIncomeAsync.fulfilled, (state, action) => {
        const index = state.incomes.findIndex(income => income._id === action.payload._id);
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
        toast.success('Income updated successfully');
      })
      .addCase(deleteIncomeAsync.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(income => income._id !== action.payload);
        toast.success('Income deleted successfully');
      });
  },
});

export default incomeSlice.reducer;