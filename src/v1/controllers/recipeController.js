const { status } = require("express/lib/response");
const recipeService = require("../services/recipeService");
const { json } = require("body-parser");

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipeService.getAllRecipes();
    if(allRecipes.length === 0) {
      res
        .status(404)
        .json({
          status: "FAILED",
          data: {
            error:
              "There are no recipes to display",
          },  
        });
    } else {
      res
        .status(200)
        .json({
          status: "OK",
          data: allRecipes,
        });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
};

const getOneRecipe = async (req, res) => {
  const {
    params: { recipeId },
  } = req;
  try {
    const recipe = await recipeService.getOneRecipe(recipeId);
    res
      .status(200)
      .json({ 
        status: "OK", 
        data: recipe 
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
};

const createNewRecipe = async (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.description ||
    !body.preparation_time ||
    !body.cooking_time ||
    !body.servings ||
    !body.ingredients ||
    !body.amounts ||
    !body.instructions
  ) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'description', 'preparation_time'," +
            " 'cooking_time', 'servings', 'ingredients', 'amounts', 'instructions'",
        },
      });
    return;
  }
  const newRecipe =  {
    name: body.name,
    description: body.description,
    preparation_time: body.preparation_time,
    cooking_time: body.cooking_time,
    servings: body.servings,
    ingredients: body.ingredients,
    amounts: body.amounts,
    instructions: body.instructions,
  }
  try {
    const createdRecipe = await recipeService.createNewRecipe(newRecipe);
    res
      .status(201)
      .json({ 
        status: "OK", 
        data: createdRecipe,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
};

const updateOneRecipe = async (req, res) => {
  const {
    body,
    params: { recipeId },
  } = req;
  if (Object.keys(body).length === 0) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: "The request body is empty. Please provide data for the update."
        }
      });
    return;
  }
  try {
    const updatedRecipe = await recipeService.updateOneRecipe(recipeId, body);
    res
      .json({ 
        status: "OK", 
        data: updatedRecipe 
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
};

const deleteOneRecipe = async (req, res) => {
  const {
    params: { recipeId }
  } = req;
  try {
    await recipeService.deleteOneRecipe(recipeId);
    res
      .status(204)
      .json({ 
        status: "OK" 
      });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ 
        status: "FAILED", 
        data: { error: error?.message || error } 
      });
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
