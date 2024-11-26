import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import incomeReducer from './incomeSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;