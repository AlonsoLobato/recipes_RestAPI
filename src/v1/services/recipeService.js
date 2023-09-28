const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllRecipes = async () => {
  try {
    const allRecipes = await Recipe.find();
    return allRecipes;
  } catch (error) {
    throw { status: 500, message: error }
  }
};

const getOneRecipe = async (recipeId) => {
  // Ensure the entered recipeId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }
  
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      };
    }
    return recipe;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const createNewRecipe = async (newRecipe) => {
  const recipeToInsert = {
    ...newRecipe,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  }
  
  try {
    const isAlreadyAdded = await Recipe.findOne({ name: recipeToInsert.name });
    if (!!isAlreadyAdded) {
      throw {
        status: 400,
        message: `Recipe with the name '${recipeToInsert.name}' already exists`,
      };
    }
    const createdRecipe = new Recipe(recipeToInsert);
    return createdRecipe.save();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const updateOneRecipe = async (recipeId, changes) => {
  // Ensure the entered recipeId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }
  
  try {
    const recipeToUpdate = await Recipe.findById(recipeId);
    if (!recipeToUpdate) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      };
    }
    const updatedRecipe = {
      // Convert Mongoose document (recipe) to plain JavaScript object
      ...recipeToUpdate.toObject(),
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    };
    await Recipe.findByIdAndUpdate(recipeId, updatedRecipe);
    return updatedRecipe;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const deleteOneRecipe = async (recipeId) => {
  // Ensure the entered recipeId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }
  
  try {
    const recipeToDelete = await Recipe.findById(recipeId);
    if (!recipeToDelete) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      };
    }
    await Recipe.findOneAndDelete(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
