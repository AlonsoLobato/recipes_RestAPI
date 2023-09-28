const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// CRUD for users
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getOneUser);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;
