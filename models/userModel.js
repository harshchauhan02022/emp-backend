// models/userModel.js
const db = require('../config/db');

const UserModel = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getUserById: (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], callback);
  },

  createUser: (userData, callback) => {
    db.query('INSERT INTO users SET ?', userData, callback);
  },

  // Add other CRUD methods as needed
};

module.exports = UserModel;
