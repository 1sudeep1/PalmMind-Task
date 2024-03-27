const express = require('express')
const {registerUser, loginUser, resetPassword, getAllUsers}= require('../controllers/users')
router=express.Router()

//route for register new user
router.post('/register', registerUser)

//route for login registered user
router.post('/login', loginUser)


//route for reset password
router.post('/reset-password', resetPassword)

//route for get all users
router.get('/users', getAllUsers)

module.exports= router