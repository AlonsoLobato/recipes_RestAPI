const { status } = require("express/lib/response");
const userService = require("../services/userService");
const { json } = require("body-parser");
const userValidation = require("../validations/userValidation");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    if (allUsers.length === 0) {
      res
        .status(404)
        .json({
          status: "FAILED",
          data: {
            error: "There are no users to display"
          },
        });
    } else {
      res
        .status(200)
        .json({
          status: "OK",
          data: allUsers,
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

const getOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  try {
    const user = await userService.getOneUser(userId);
    res
      .status(200)
      .json({ 
        status: "OK", 
        data: user, 
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

const createNewUser = async (req, res) => {
  const { body } = req;
  // Validate user input
  const { error } = userValidation.registerValidation(body);
  if (error) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: error.details[0].message
        }
      });
  } else {
    try {
      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const newUser = {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        dateOfBirth: body.dateOfBirth,
      }
      const createdUser = await userService.createNewUser(newUser);
      res
        .status(201)
        .json({ 
          status: "OK", 
          data: createdUser,
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
}

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;
  // Validate user input
  const { error } = userValidation.updateValidation(body);
  if (error) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: error.details[0].message
        }
      });
  } else {
    try {
      if (body.password) {
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;
      }
      const updatedUser = await userService.updateOneUser(userId, body);
      res
        .json({ 
          status: "OK", 
          data: updatedUser 
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

const deleteOneUser = async (req, res) => {
  const {
    params: { userId },
  } = req;
  try {
    await userService.deleteOneUser(userId);
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

const loginUser = async (req, res) => {
  const { body } = req;
  // Validate user input
  const { error } = userValidation.loginValidation(body);
  if (error) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: {
          error: error.details[0].message
        }
      });
  } else {
    try {
      const token = await userService.loginUser(body);
      res
        .status(200)
        .header('auth-token', token)
        .json({ 
          status: "Logged in successfully",
          data: token,
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

const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .header('auth-token', undefined)
      .json({ 
        status: "Logged out successfully",
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

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  loginUser,
  logoutUser,
}
