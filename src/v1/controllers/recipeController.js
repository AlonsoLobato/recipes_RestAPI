const { status } = require("express/lib/response");
const recipeService = require("../services/recipeService")

const getAllRecipes = (req, res) => {
  try {
    const allRecipes = recipeService.getAllRecipes();
    res.send({ status: "OK", data: allRecipes });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneRecipe = (req, res) => {
  const {
    params: { recipeId },
  } = req;
  if (!recipeId) {
    res
      .status(404)
      .send({
        status: "FAILED",
        data: {
          error:
            "The requested recipe doesn't exist",
        },
      });
    return;
  }
  try {
    const recipe = recipeService.getOneRecipe(recipeId);
    res.send({ status: "OK", data: recipe });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewRecipe = (req, res) => {
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
      .send({
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
    const createdRecipe = recipeService.createNewRecipe(newRecipe);
    res.status(201).send({ status: "OK", data: createdRecipe });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneRecipe = (req, res) => {
  const {
    body,
    params: { recipeId },
  } = req;
  if (!recipeId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error: 
            "The requested update couldn't be completed"
        },
      });
    return;
  }
  try {
    const updatedRecipe = recipeService.updateOneRecipe(recipeId, body);
    res.send({ status: "OK", data: updatedRecipe });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneRecipe = (req, res) => {
  const {
    params: { recipeId }
  } = req;
  if (!recipeId) {
    res
      .status(400)
      .send({ 
        status: "FAILED",
        data: {
          error:
            "The requested deletion couldn't be completed"
        },
      });
    return;
  }
  try {
    recipeService.deleteOneRecipe(recipeId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createNewRecipe,
  updateOneRecipe,
  deleteOneRecipe,
};
