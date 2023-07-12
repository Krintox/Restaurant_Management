// routes/reservation.js

const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const Reservation = require('../models/Reservation');

// Get all available tables
router.get('/tables', async (req, res) => {
  try {
    const tables = await Table.find({ isAvailable: true });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new table
router.post('/tables', async (req, res) => {
  const { number, capacity } = req.body;

  try {
    const table = new Table({
      number,
      capacity,
      isAvailable: true,
    });

    const savedTable = await table.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a reservation
router.post('/reservations', async (req, res) => {
  const { tableId, date, timeSlot, customerName } = req.body;

  try {
    // Check if the table is available
    const table = await Table.findById(tableId);
    if (!table || !table.isAvailable) {
      return res.status(400).json({ message: 'Table is not available' });
    }

    // Create a new reservation
    const reservation = new Reservation({
      table: tableId,
      date,
      timeSlot,
      customerName,
    });

    // Set the table as unavailable
    table.isAvailable = false;
    await table.save();

    // Save the reservation
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
