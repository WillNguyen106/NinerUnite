const express = require('express');
const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');// for validating guest or register user
const {logInLimiter} = require('../middlewares/rateLimiters');// limiting login failure  5 times



const router = express.Router();

router.get('/index', isLoggedIn, userController.index);
//get the login page
router.get('/login', isGuest, userController.login);

//progress login process
router.post('/login', logInLimiter, isGuest, userController.process);

//get the sign up form

router.get('/signup', isGuest, userController.signup);

//POST /users: create a new user

router.post('/', isGuest, userController.newUser);

//GET /users/profile/:id get a member profile
router.get('/profile/:id', isLoggedIn, userController.profile);

//GET /users/:id/edit: send HTML form for editing an existing profile
router.get('/:id/edit', userController.edit);

//get the logout page
router.get('/logout', isLoggedIn, userController.logout);

//GET ./user/myPosts : get the myPosts page
router.get('/myPosts', isLoggedIn, userController.myPosts);

module.exports = router;