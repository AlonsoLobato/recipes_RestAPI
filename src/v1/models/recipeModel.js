const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preparation_time: {
    type: String,
    required: true,
  },
  cooking_time: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [{ type: String }],
    required: true,
  },
  amounts: {
    type: [{ type: String }],
    required: true,
  },
  instructions: {
    type: [{ type: String }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
