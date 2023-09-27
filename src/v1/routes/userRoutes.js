const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// CRUD for users
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getOneUser);

router.post("/register", userController.createNewUser);                // Should this be "/register" or just "/" ?
// router.post("/login", userController.loginUser);                    // TB implemented on controller and service

router.patch("/:userId", userController.updateOneUser);
router.delete("/:userId", userController.deleteOneUser);

module.exports = router;
