const express = require('express');
const router = express.Router();
const {
    registerUser,
    LogInUser
} = require('../controller/AuthController')


//router.get('/users', getUsers);
router.post('/register', registerUser)


// Logging In
router.post('/signin', LogInUser)

module.exports = router