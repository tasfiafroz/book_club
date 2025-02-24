const express = require('express')
const requireAuth = require("../middleware/requireAuth")

//controller functions
const { signupUser, loginUser, refreshToken, getUser, updateUser } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//refresh token
router.post('/refresh-token', refreshToken)

//GET user
//router.get('/profile/:email', getUser)

// Get user profile (protected route)
router.get('/profile', requireAuth, getUser);

// Update user profile (protected route)
router.put('/profile', requireAuth, updateUser);

module.exports = router