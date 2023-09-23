const DB = require("./db.json");
const { saveToDatabase } =  require("./utils");

const getAllCommentsForRecipe = (recipeId) => {
  try {
    const recipe = DB.recipes.find((recipe) => recipe.id === recipeId);
    if (!recipe) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      }
    }
    const comments = DB.comments.filter((comment) => comment.recipeId === recipeId);
    if (!comments) {
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

const getOneComment = (recipeId, commentId) => {
  try {
    const comment = DB.comments.find((comment) => (comment.id === commentId) && (comment.recipeId === recipeId));
    if (!comment) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' or comment with id '${commentId}' don't exist`
      }
    }
    return comment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const createNewComment = (newComment, recipeId) => {
  try {
    const recipe = DB.recipes.find((recipe) => recipe.id === recipeId);
    if (!recipe) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' doesn't exist`
      };
    }
    DB.comments.push(newComment);
    saveToDatabase(DB);
    return newComment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const updateOneComment = (recipeId, commentId, changes) => {
  try {
    const indexToUpdate = DB.comments.findIndex((comment) => (comment.id === commentId) && (comment.recipeId === recipeId));
    if (indexToUpdate === -1) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' or comment with id '${commentId}' don't exist`
      }
    }
    const updatedComment = {
      ...DB.comments[indexToUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.comments[indexToUpdate] = updatedComment;
    saveToDatabase(DB);
    return updatedComment;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const deleteOneComment = (recipeId, commentId) => {
  try {
    const indexToDelete = DB.comments.findIndex((comment) => (comment.id === commentId) && (comment.recipeId === recipeId));
    if (indexToDelete === -1) {
      throw {
        status: 404,
        message: `Recipe with the id '${recipeId}' or comment with id '${commentId}' don't exist`
      }
    }
    DB.comments.splice(indexToDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

module.exports = { 
  getAllCommentsForRecipe,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
}; 
