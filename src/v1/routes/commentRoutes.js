const express = require("express");
const commentController = require("../controllers/commentController");

// mergeParams set to true allows 'child' router access and merge parameters (i.e. _id) from the parent router
const router = express.Router({ mergeParams: true });

// User authentication middleware
const privateRoute = require("./verifyAuthToken");

// CRUD for comments
router.get("/", commentController.getAllCommentsForRecipe);
router.get("/:commentId", commentController.getOneComment);

router.post("/", privateRoute.verifyAuthToken, commentController.createNewCommentForRecipe);
router.patch("/:commentId", privateRoute.verifyAuthToken, commentController.updateOneComment);

router.delete("/:commentId", commentController.deleteOneComment);

module.exports = router;
