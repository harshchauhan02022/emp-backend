// models/userModel.js
const bcrypt = require('bcrypt');
const db = require('../config/db');
const crypto = require('crypto');
const moment = require('moment');

const UserModel = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getUserById: (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], callback);
  },

  createUser: (userData, callback) => {
    const { name, email, password } = userData;

    bcrypt.hash(password, 10, (hashError, hashedPassword ) => {
      if (hashError) {
        return callback(hashError, null);
      }

      db.query('INSERT INTO users(name, email, password) VALUES (?, ?,?)', [name, email, hashedPassword ], (error, results) => {

        if (error) {
          return callback(error, null);
        };
        return callback(null, { id: results.inse });
      });
    });
  },

  loginUser: (email, password, callback) => {
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        return callback(error, null);
      }

      if (results.length === 0) {
     return callback(null, null);
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
        if (bcryptError) {
          return callback(bcryptError, null);
        }

        if (!isMatch) {
          return callback(null, null);
        }
        const { password, ...userData } = user;
        return callback(null, userData);
      });
    });
  },

  getUserByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        return callback(error, null);
      }

      if (results.length === 0) {
      
        return callback(null, null);
      }

      const user = results[0];
      return callback(null, user);
    });
  },

  updateResetToken: (userId, resetToken, resetTokenExpiry, callback) => {
    db.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, resetTokenExpiry, userId], (error, results) => {
      if (error) {
        return callback(error, null);
      }

      return callback(null, results);
    });
  },

  updateUserdetails: (userData, callback) => {
    return db.query('INSERT INTO userdetails SET ?', userData);
  }
};

module.exports = UserModel;
