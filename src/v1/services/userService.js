const User = require("../models/userModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw { status: 500, message: error }
  }
};

const getOneUser = async (userId) => {
  // Ensure the entered userId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(userId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid user id' }
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw {
        status: 404,
        message: `User with id '${userId}' doesn't exist`
      };
    }
    return user
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const createNewUser = async (newUser) => {
  const userToInsert = {
    ...newUser,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  }
  try {
    const isAlreadyAdded = await User.findOne({ email: userToInsert.email });
    if (!!isAlreadyAdded) {
      throw {
        status: 400,
        message: `User with email '${userToInsert.email}' already exists`,
      };
    }
    const createdUser = new User(userToInsert);
    return createdUser.save();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const updateOneUser = async (userId, changes) => {
  // Ensure the entered userId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(userId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid user id' }
  }
  
  try {
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw {
        status: 404,
        message: `User with id '${userId}' doesn't exist`
      };
    }
    const updatedUser = {
      ...userToUpdate.toObject(),
      name: changes.name || userToUpdate.name,
      email: changes.email || userToUpdate.email,
      password: changes.password || userToUpdate.password,
      dateOfBirth: changes.dateOfBirth || userToUpdate.dateOfBirth,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    }
    await User.findByIdAndUpdate(userId, updatedUser);
    return updatedUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

const deleteOneUser = async (userId) => {
  // Ensure the entered userId is a valid mongoose 'ObjectId'
  try {
    const objectId = new ObjectId(userId);
  } catch (error) {
    throw { status: error?.status || 500, message: 'invalid user id' }
  }
  
  try {
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      throw {
        status: 404,
        message: `User with id ${userId} doesn't exist`
      }
    }
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
