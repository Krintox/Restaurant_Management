// models/Reservation.js

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  customerName: { type: String, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
