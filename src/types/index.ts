export interface Expense {
  _id?: string;
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
}

export interface Income {
  _id?: string;
  id?: string;
  description: string;
  amount: number;
  type: 'salary' | 'interest' | 'dividend' | 'cashback';
  date: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
}