// routes/analytics.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Get the most popular dish
router.get('/analytics/popular-dish', async (req, res) => {
  try {
    const popularDish = await Order.aggregate([
      { $unwind: '$menuItems' },
      { $group: { _id: '$menuItems', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      { $lookup: { from: 'menuitems', localField: '_id', foreignField: '_id', as: 'menuItem' } },
      { $unwind: '$menuItem' },
      { $project: { _id: 0, dish: '$menuItem.name', count: 1 } },
    ]);

    res.json(popularDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the peak hours
router.get('/analytics/peak-hours', async (req, res) => {
  try {
    const peakHours = await Order.aggregate([
      { $group: { _id: { $hour: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $project: { _id: 0, hour: '$_id', count: 1 } },
    ]);

    res.json(peakHours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total sales
router.get('/analytics/total-sales', async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: 1 } } },
      { $project: { _id: 0, total: 1 } },
    ]);

    res.json(totalSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
