// controllers/userController.js
const UserModel = require('../models/userModel');

const UserController = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;
    UserModel.getUserById(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results[0]);
    });
  },

  createUser: (req, res) => {
    const userData = req.body;
    UserModel.createUser(userData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ id: results.insertId });
    });
  },

  // Add other CRUD methods as needed
};

module.exports = UserController;
