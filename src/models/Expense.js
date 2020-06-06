const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  stablishment: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
  card: { type: mongoose.Types.ObjectId, ref: 'card', required: true },
});

const Expense = mongoose.model('expense', ExpenseSchema);

module.exports = Expense;