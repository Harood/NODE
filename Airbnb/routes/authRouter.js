const express = require('express');
const authRouter = express.Router();

const authController = require('../controller/authController');

// Login (GET)
authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.post('/logout', authController.postlogout);

module.exports = { authRouter };