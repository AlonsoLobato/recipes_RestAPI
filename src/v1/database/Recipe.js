const DB = require("./db.json");
const { saveToDatabase } =  require("./utils");

const getAllRecipes = () => {
  try {
    return DB.recipes;
  } catch (error) {
    throw { status: 500, message: error }
  }
};

const getOneRecipe = (recipeId) => {
  try {
    const recipe = DB.recipes.find((recipe) => recipe.id === recipeId);
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

const createNewRecipe = (newRecipe) => {
  try {
    const isAlreadyAdded = 
      DB.recipes.findIndex((recipe) => recipe.name === newRecipe.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Recipe with the name '${newRecipe.name}' already exists`,
      };
    }
    DB.recipes.push(newRecipe);
    saveToDatabase(DB);
    return newRecipe;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const updateOneRecipe = (recipeId, changes) => {
  try {
    const indexToUpdate = DB.recipes.findIndex((recipe) => recipe.id === recipeId);
    if (indexToUpdate === -1) {
      throw {
        status: 400,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      }
    }
    const updatedRecipe = {
      ...DB.recipes[indexToUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.recipes[indexToUpdate] = updatedRecipe;
    saveToDatabase(DB);
    return updatedRecipe;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const deleteOneRecipe = (recipeId) => {
  try {
    const indexToDelete = DB.recipes.findIndex((recipe) => recipe.id === recipeId);
    if (indexToDelete === -1) {
      throw {
        status: 400,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      }
    }
    DB.recipes.splice(indexToDelete, 1);
    saveToDatabase(DB);
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
