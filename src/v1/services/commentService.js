const Comment = require("../models/commentModel");
const Recipe = require("../models/recipeModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllCommentsForRecipe = async (recipeId) => {
  // Ensure the entered recipeId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw {
        status: 404,
        message: `There is no recipe with id '${recipeId}'`
      }
    }

    const comments = await Comment.find({ recipeId: recipeId });
    if (comments.length === 0) {
      throw {
        status: 400,
        message: `There are no comments for recipe with id '${recipeId}'`
      };
    }
    return comments;

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const getOneComment = async (commentId) => {
  // Ensure the entered commentId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(commentId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw {
        status: 404,
        message: `There is no comment to retrieve with id '${commentId}'`
      }
    }
    return comment;

  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid comment id' }
  }
};

const createNewCommentForRecipe = async (newComment, recipeId) => {
  // Ensure the entered recipeId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(recipeId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid recipe id' }
  }
  
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw {
        status: 404,
        message: `There is no recipe with id '${recipeId}'`
      }
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }

  const commentToInsert = {
    ...newComment,
    recipeId: recipeId,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  }
  try {
    const createdComment = new Comment(commentToInsert);
    return createdComment.save();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const updateOneComment = async (commentId, changes) => {
  // Ensure the entered commentId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(commentId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid comment id' }
  }
  
  try {
    const commentToUpdate = await Comment.findById(commentId);
    if (!commentToUpdate) {
      throw {
        status: 404,
        message: `Comment with the id '${commentId}' doesn't exist`
      };
    }
    const updatedComment = {
      ...commentToUpdate.toObject(),  // Convert Mongoose document to plain JavaScript object
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    };
    await Comment.findByIdAndUpdate(commentId, updatedComment);
    return updatedComment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const deleteOneComment = async (commentId) => {
  // Ensure the entered commentId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(commentId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid comment id' }
  }

  try {
    const commentToDelete = await Comment.findById(commentId);
    if (!commentToDelete) {
      throw {
        status: 404,
        message: `Comment with the id '${commentId}' doesn't exist`
      };
    }
    await Comment.findOneAndDelete(commentId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

module.exports = { 
  getAllCommentsForRecipe,
  getOneComment,
  createNewCommentForRecipe,
  updateOneComment,
  deleteOneComment,
};
