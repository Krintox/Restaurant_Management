// routes/inventory.js

const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const MenuItem = require('../models/MenuItem');

// Get all ingredients
router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all menu items
router.get('/menu-items', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new ingredient
router.post('/ingredients', async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const ingredient = new Ingredient({ name, quantity });
    const savedIngredient = await ingredient.save();

    res.status(201).json(savedIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu item
router.post('/menu-items', async (req, res) => {
  const { name, ingredientIds } = req.body;

  try {
    const ingredients = await Ingredient.find({ _id: { $in: ingredientIds } });
    if (ingredients.length !== ingredientIds.length) {
      return res.status(400).json({ message: 'One or more ingredients not found' });
    }

    const menuItem = new MenuItem({ name, ingredients });
    const savedMenuItem = await menuItem.save();

    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
