const express = require('express')
const {registerUser, loginUser, resetPassword}= require('../controllers/users')
router=express.Router()

//route for register new user
router.post('/register', registerUser)

//route for login registered user
router.post('/login', loginUser)


//route for reset password
router.post('/reset-password', resetPassword)

module.exports= router