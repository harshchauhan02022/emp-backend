// models/eventModel.js
const db = require('../config/db');

const eventModel = {
 getAllEvents: (callback) => {
  db.query('SELECT * FROM events', callback);
},

getEventById: (eventId, callback) => {
  db.query('SELECT * FROM events WHERE id = ?', [eventId], callback);
},

 // Create a new event
 createEvent: (userData, callback) => {
  const { user_id, title, description, event_date } = userData;

  db.query('INSERT INTO events (user_id, title, description, event_date) VALUES (?, ?, ?, ?)', [user_id, title, description, event_date], (error, results) => {
   if (error) {
    return callback(error, null);
   }
   return callback(null, { id: results.insertId });
  });
 },
};

module.exports = eventModel;
