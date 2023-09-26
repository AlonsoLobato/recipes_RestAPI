const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

// CRUD for recipes
router.get("/", recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getOneRecipe);
router.post("/", recipeController.createNewRecipe);
router.patch("/:recipeId", recipeController.updateOneRecipe);
router.delete("/:recipeId", recipeController.deleteOneRecipe);

module.exports = router;
