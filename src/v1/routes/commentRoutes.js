const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router({ mergeParams: true });  // is mergeParams needed?
const private = require("./verifyRoutes");

// CRUD for comments
router.get("/", commentController.getAllCommentsForRecipe);
router.get("/:commentId", commentController.getOneComment);
router.post("/", private.verifiedRoute, commentController.createNewCommentForRecipe);    // TBD -> Needs to add user auth features ('comments' in DB require 'userId' field to be implemented)
router.patch("/:commentId", private.verifiedRoute, commentController.updateOneComment);  // TBD -> Needs to add user auth features ('comments' in DB require 'userId' field to be implemented)
router.delete("/:commentId", commentController.deleteOneComment);

module.exports = router;
