const { v4: uuid } = require("uuid");
const Comment = require("../database/Comment");

const getAllCommentsForRecipe = (recipeId) => { 
  try {
    const comment = Comment.getAllCommentsForRecipe(recipeId);
    return comment;
  } catch (error) {
    throw (error);
  }
};

const getOneComment = (recipeId, commentId) => {
  try {
    const comment = Comment.getOneComment(recipeId, commentId);
    return comment;
  } catch (error) {
    throw (error);
  }
};

const createNewComment = (newComment, recipeId) => { //
  const commentToInsert = {
    ...newComment,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  }
  try {
    const createdComment = Comment.createNewComment(commentToInsert, recipeId);
    return createdComment;
  } catch (error) {
    throw(error);
  }
};

const updateOneComment = (recipeId, commentId, changes) => {
  try {
    const updatedComment = Comment.updateOneComment(recipeId, commentId, changes);
    return updatedComment;
  } catch (error) {
    throw(error);
  }
};

const deleteOneComment = (recipeId, commentId) => {
  try {
    Comment.deleteOneComment(recipeId, commentId);
  } catch (error) {
    throw(error);
  }
};

module.exports = { 
  getAllCommentsForRecipe,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
};
