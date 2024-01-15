// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Define routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/register", UserController.createUser);

module.exports = router;
