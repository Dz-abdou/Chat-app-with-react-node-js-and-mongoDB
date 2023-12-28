const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { off } = require('../models/userModel');

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: '3d' })
}

// signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user.email);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// login 
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.login(email, password);

    const token = createToken(user.email);
    const username = user.username;
    console.log(token, username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const addRoom = async (req, res) => {
  const { room, username } = req.body;
  console.log(room, username);
  try {
    let user = await User.findOne({ username });

    if (!user) {
      throw Error("User doesn't exist");
    }
    if (!user.room.includes(room)) {
      user.room.push(room);
      await user.save();
      res.status(200).json({ message: 'room added to list' });
      return;
    }
    res.status(200).json({ message: 'room exists' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

const getRooms = async (req, res) => {
  const { username } = req.query;
  console.log(username);
  try {
    let user = await User.findOne({ username });

    if (!user) {
      throw Error("User doesn't exist");
    }
    res.status(200).send(user.room);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signup, login, addRoom, getRooms };