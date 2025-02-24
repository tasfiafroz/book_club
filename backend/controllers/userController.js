const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to create an access token (valid for 1 day)
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '12d' });
};

// Function to create a refresh token (valid for 7 days)
const createRefreshToken = (_id) => {
    return jwt.sign({ _id }, process.env.REFRESH_SECRET, { expiresIn: '13d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // Generate tokens
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        res.status(200).json({ email, token, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { username, name, age, address, email, password } = req.body;

    try {
        const user = await User.signup(username, name, age, address, email, password);

        // Generate tokens
        const token = createToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        res.status(200).json({ username, name, age, address, email, token, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Refresh access token using refresh token
const refreshToken = async (req, res) => {
    const { token } = req.body;
    
    if (!token) return res.status(401).json({ error: 'No refresh token provided' });

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const newAccessToken = createToken(decoded._id);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
};

const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


// Update user profile
const updateUser = async (req, res) => {
    const { name, age, address } = req.body;

    try {
        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, // User ID from the authenticated request
            { name, age, address }, // Fields to update
            { new: true, runValidators: true } // Return the updated document and run validators
        ).select('-password'); // Exclude password from the response

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signupUser, loginUser, refreshToken, getUser, updateUser };
