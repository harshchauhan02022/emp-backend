// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

// Define routes
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.post("/register", EventController.createEvent);



module.exports = router;
