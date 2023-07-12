// models/MenuItem.js

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
