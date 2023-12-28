const express = require('express');
const {signup, login, addRoom, getRooms} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/addRoom').post(addRoom);
userRouter.route('/getRooms').get(getRooms);

module.exports = userRouter;

