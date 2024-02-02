// controllers/eventController.js
const eventModel = require('../models/eventModel');

const EventController = {
  // Get all events
  getAllEvents: (req, res) => {
    eventModel.getAllEvents((err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ eventList: result });
    });
  },

  // Get event by ID
  getEventById: (req, res) => {
    const eventId = req.params.id;
    eventModel.getEventById(eventId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results[0]);
    });
  },

  // Create a new event
  createEvent: (req, res) => {
    const eventData = req.body;
    // console.log(">>>>>>>>>>>>>>Event Data:", eventData);

    eventModel.createEvent(eventData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      res.status(200).json({ status: true, message: "Event registered successfully." });
    });
  },

  // Add more event-related methods if needed
};

module.exports = EventController;
