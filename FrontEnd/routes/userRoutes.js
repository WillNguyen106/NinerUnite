const express = require('express');
const userController = require('../controllers/userController');
//const {isGuest, isLoggedIn} = require('../middlewares/auth');// for validating guest or register user
const {logInLimiter} = require('../middlewares/rateLimiters');// limiting login failure times



const router = express.Router();

router.get('/', userController.index);
//get the login page
router.get('/login', userController.login);

//progress login process
router.post('/login', logInLimiter, userController.process);

//get the sign up form

router.get('/signup', userController.signup);

//POST /users: create a new user

router.post('/', userController.newUser);

//GET /users/profile: get the logged in user profile
router.get('/profile', userController.profile);

//get the logout page

router.get('/logout', userController.logout);

module.exports = router;