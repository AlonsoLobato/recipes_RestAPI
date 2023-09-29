const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();
const apicache = require("apicache");

// Cache
const cache = apicache.middleware;

// CRUD for recipes
router.get("/", cache("2 minutes"), recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getOneRecipe);

router.post("/", recipeController.createNewRecipe);
router.patch("/:recipeId", recipeController.updateOneRecipe);

router.delete("/:recipeId", recipeController.deleteOneRecipe);

module.exports = router;
