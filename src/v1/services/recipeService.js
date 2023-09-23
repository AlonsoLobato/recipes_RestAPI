const { v4: uuid } = require("uuid");
const Recipe = require("../database/Recipe");

const getAllRecipes = () => {
  try {
    const allRecipes = Recipe.getAllRecipes();
    return allRecipes;
  } catch (error) {
    throw(error);
  }
};

const getOneRecipe = (recipeId) => {
  try {
    const recipe = Recipe.getOneRecipe(recipeId);
    return recipe;
  } catch (error) {
    throw(error);
  }
};

const createNewRecipe = (newRecipe) => {
  const recipeToInsert = {
    ...newRecipe,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  }
  try {
    const createdRecipe = Recipe.createNewRecipe(recipeToInsert);
    return createdRecipe;
  } catch (error) {
    throw(error);
  }
};

const updateOneRecipe = (recipeId, changes) => {
  try {
    const updatedRecipe = Recipe.updateOneRecipe(recipeId, changes);
    return updatedRecipe;
  } catch (error) {
    throw(error);
  }
};

const deleteOneRecipe = (recipeId) => {
  try {
    Recipe.deleteOneRecipe(recipeId);
  } catch (error) {
    throw(error);
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
