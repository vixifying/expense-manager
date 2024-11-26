import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['salary', 'interest', 'dividend', 'cashback'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Income = mongoose.model('Income', incomeSchema);