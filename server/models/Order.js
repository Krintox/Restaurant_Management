// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  menuItems: [{ type: String, required: true }],
  status: { type: String, enum: ['preparing', 'ready', 'served'], default: 'preparing' },
});

module.exports = mongoose.model('Order', orderSchema);
