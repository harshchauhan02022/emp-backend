// controllers/userController.js
const UserModel = require('../models/userModel');
const nodemailer = require('nodemailer');

const UserController = {
  getAllUsers: (req, res) => {
    // get all users
    const users = UserModel.getAllUsers((err, result) => {
      if(err){
        return res.status(500).json({error: "internul server error"})
      }

      return res.status(200).json({userlist:result})

    });
    // console.log(">>>>>>>............ users", users);
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

  loginUser: (req, res) => {
    const { email, password } = req.body;

    UserModel.loginUser(email, password, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful', user });
    });
  },


  forgotPassword: (req, res) => {
    const { email } = req.body;

 
    UserModel.getUserByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!user) {
        
        return res.status(404).json({ error: 'User not found' });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; 

      UserModel.updateResetToken(user.id, resetToken, resetTokenExpiry, (updateError, updateResults) => {
        if (updateError) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const resetLink = `http://your-app/reset-password?token=${resetToken}`;
        sendPasswordResetEmail(email, resetLink);

        res.json({ message: 'Password reset instructions sent to your email' });
      });
    });
  },

  updateUserdetails: (req, res) => {
    const userData = req.body;
    const dd = UserModel.updateUserdetails(userData);
    console.log(">>>>>>>> mmohit", dd);
  },

  // Add other CRUD methods as needed
};

module.exports = UserController;
