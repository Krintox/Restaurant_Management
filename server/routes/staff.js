// routes/staff.js

const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Get all staff members
router.get('/staff', async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new staff member
router.post('/staff', async (req, res) => {
  const { name, position, shift } = req.body;

  try {
    const staffMember = new Staff({ name, position, shift });
    const savedStaffMember = await staffMember.save();

    res.status(201).json(savedStaffMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
