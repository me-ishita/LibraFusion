// models/borrow.js
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedDate: { type: Date, default: Date.now },
  returned: { type: Boolean, default: false },
});

module.exports = mongoose.model('Borrow', borrowSchema);