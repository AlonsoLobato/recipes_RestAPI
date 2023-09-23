const express = require("express");
const recipeController = require("../controllers/recipeController");
const commentController = require("../controllers/commentController");
const router = express.Router();

// CRUD for recipes

router.get("/", recipeController.getAllRecipes);
router.get("/:recipeId", recipeController.getOneRecipe);
router.post("/", recipeController.createNewRecipe);
router.patch("/:recipeId", recipeController.updateOneRecipe);
router.delete("/:recipeId", recipeController.deleteOneRecipe);

// CRUD for comments

router.get("/:recipeId/comments", commentController.getAllCommentsForRecipe);
router.get("/:recipeId/comments/:commentId", commentController.getOneComment);
router.post("/:recipeId/comments", commentController.createNewComment);             // TBC -> Needs to add user auth features ('comments' in DB require 'userId' field to be implemented)
router.patch("/:recipeId/comments/:commentId", commentController.updateOneComment);  // TBC -> Needs to add user auth features ('comments' in DB require 'userId' field to be implemented)
router.delete("/:recipeId/comments/:commentId", commentController.deleteOneComment);

module.exports = router;
