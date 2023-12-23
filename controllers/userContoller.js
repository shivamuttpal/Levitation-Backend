const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: 'All users data',
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: 'Error in get all User',
      success: false,
      err,
    });
  }
};

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please Fill all Fields',
      });
    }

    // Existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    return res.status(201).send({
      success: true,
      message: 'New User Created',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: 'Error in Register callback',
      success: false,
      err,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: 'Please provide email or password',
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'Email is not registered',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.status(200).send({
      success: true,
      message: 'Login successfully',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: 'Error in Login callback',
      err,
    }); 
  }
};

