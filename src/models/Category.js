const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
