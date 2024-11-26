import express from 'express';
import { Income } from '../models/Income.js';

export const incomeRouter = express.Router();

// Get all incomes
incomeRouter.get('/', async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create income
incomeRouter.post('/', async (req, res) => {
  const income = new Income(req.body);
  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update income
incomeRouter.patch('/:id', async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete income
incomeRouter.delete('/:id', async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});