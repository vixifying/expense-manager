import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { expenseRouter } from './routes/expenses.js';
import { incomeRouter } from './routes/incomes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://iqviavikram:vl29YTza1WGbo4Gx@emcluster0.uf37g.mongodb.net/expense-manager')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/expenses', expenseRouter);
app.use('/api/incomes', incomeRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});