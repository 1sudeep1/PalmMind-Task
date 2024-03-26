const express = require('express')
const {registerUser, loginUser}= require('../controllers/users')
router=express.Router()

//route for register new user
router.post('/register', registerUser)

//route for login registered user
router.post('/login', loginUser)

module.exports= router