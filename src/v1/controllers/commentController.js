const { status } = require("express/lib/response");
const commentService = require("../services/commentService");

const getAllCommentsForRecipe = (req, res) => {
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
    const comments = commentService.getAllCommentsForRecipe(recipeId);
    res.send({ status: "OK", data: comments });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneComment = (req, res) => {
  const {
    params: { recipeId, commentId },
  } = req;
  if (!recipeId || !commentId) {
    res
      .status(404)
      .send({
        status: "FAILED",
        data: {
          error:
            "The requested recipe or comment don't exist",
        },
      });
    return;
  }
  try {
    const comment = commentService.getOneComment(recipeId, commentId);
    res.send({ status: "OK", data: comment });
  } catch (error) {
    res
    .status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } });
  }
}

const createNewComment = (req, res) => {
  const { body } = req;
  if ( !body.comment ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'comment'" 
        },
      });
    return;  
  }
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
  const newComment = {
    comment: body.comment,
    like: body.like || false,
    dislike: body.dislike || false,
    favorite: body.favorite || false,
    recipeId: recipeId,
  }
  try {
    const createdComment = commentService.createNewComment(newComment, recipeId);
    res.status(201).send({ status: "OK", data: createdComment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
}

const updateOneComment = (req, res) => {
  const {
    body,
    params: { recipeId, commentId}, 
  } = req;
  if (!recipeId || !commentId) {
    res
      .status(404)
      .send({
        status: "FAILED",
        data: {
          error:
            "The requested update couldn't be completed",
        },
      });
    return;  
  }
  try {
    const updatedComment = commentService.updateOneComment(recipeId, commentId, body)
    res.send({ status: "OK", data: updatedComment });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
  }
};

const deleteOneComment = (req, res) => {
  const {
    params: { recipeId, commentId },
  } = req;
  if (!recipeId || !commentId) {
    res
      .status(404)
      .send({
        status: "FAILED",
        data: {
          error:
            "The requested recipe or comment don't exist",
        },
      });
    return;
  }
  try {
    commentService.deleteOneComment(recipeId, commentId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
}

module.exports = { 
  getAllCommentsForRecipe,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
};
