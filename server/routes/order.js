// routes/order.js

const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const Order = require('../models/Order');

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an order
router.post('/orders', async (req, res) => {
  const { tableId, menuItems } = req.body;

  try {
    // Check if the table exists and is available
    const table = await Table.findById(tableId);
    if (!table || !table.isAvailable) {
      return res.status(400).json({ message: 'Table does not exist or is not available' });
    }

    // Create a new order
    const order = new Order({
      table: tableId,
      menuItems,
    });

    // Save the order
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the status of an order
router.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
