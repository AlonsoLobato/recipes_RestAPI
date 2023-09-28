const { status } = require("express/lib/response");
const commentService = require("../services/commentService");
const { json } = require("body-parser");

const getAllCommentsForRecipe = async (req, res) => {
  const {
    params: { recipeId },
  } = req;
  try {
    const comments = await commentService.getAllCommentsForRecipe(recipeId);
    res
      .status(200)
      .json({
        status: "OK",
        data: comments,
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

const getOneComment = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  try {
    const comment = await commentService.getOneComment(commentId);
    if(!comment) {
      res
        .status(404)
        .json({
          status: "FAILED",
          data: {
            error: "The requested comment doesn't exist",
          },  
        });
    } else {
      res
        .status(200)
        .json({
          status: "OK",
          data: comment,
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

const createNewCommentForRecipe = async (req, res) => {
  const {
    body,
    user,
    params: { recipeId },
  } = req;

  // Ensuring request body includes only allowed fields
  const allowedFields = ['comment', 'like', 'dislike', 'favorite'];
  const bodyKeys = Object.keys(body);
  const disallowedFields = bodyKeys.filter(field => !allowedFields.includes(field));

  if (disallowedFields.length > 0) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: `Invalid fields found in the request body: ${disallowedFields.join(', ')}`
        }
      });
  } else {
    const newComment = {
      comment: body.comment,
      like: body.like || false,
      dislike: body.dislike || false,
      favorite: body.favorite || false,
      recipeId: recipeId,
      userId: user._id,
    }
    try {
      const createdComment = await commentService.createNewCommentForRecipe(newComment, recipeId);
      res
        .status(201)
        .json({ 
          status: "OK", 
          data: createdComment,
        });
    } catch (error) {
      res
        .status(error?.status || 500)
        .json({ 
          status: "FAILED", 
          data: { error: error?.message || error } 
        });
    }
  }
};

const updateOneComment = async (req, res) => {
  const {
    body,
    params: { commentId }, 
  } = req;

  // Ensuring request body includes only allowed fields
  const bodyKeys = Object.keys(body);
  const allowedFields = ['comment', 'like', 'dislike', 'favorite'];
  const disallowedFields = bodyKeys.filter(field => !allowedFields.includes(field));

  if (bodyKeys.length === 0) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: "The request body is empty. Please provide data for the update."
        }
      });
    return;
  } else if (disallowedFields.length > 0) {
      res
        .status(400)
        .json({
          status: "FAILED",
          data: {
            error: `Invalid fields found in the request body: ${disallowedFields.join(', ')}`
          }
        });
  } else {
      try {
        const updatedComment = await commentService.updateOneComment(commentId, body);
        res
          .status(201)
          .json({ 
            status: "OK", 
            data: updatedComment,
          });
      } catch (error) {
        res
          .status(error?.status || 500)
          .json({ 
            status: "FAILED", 
            data: { error: error?.message || error } 
          });
      }
  }
};

const deleteOneComment = async (req, res) => {
  const {
    params: { commentId },
  } = req;
  if (!commentId) {      // Is this needed?
    res
      .status(404)
      .json({
        status: "FAILED",
        data: {
          error: "The requested recipe or comment don't exist",
        },
      });
    return;
  }
  try {
    await commentService.deleteOneComment(commentId);
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
  getAllCommentsForRecipe,
  getOneComment,
  createNewCommentForRecipe,
  updateOneComment,
  deleteOneComment,
};
