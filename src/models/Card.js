const mongoose = require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
  name: { type: String, required: true },
  provider: { type: String },
  expiration_date: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
});

const Card = mongoose.model('card', CardSchema);

module.exports = Card;
