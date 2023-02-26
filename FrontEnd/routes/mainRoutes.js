const express = require('express');// for express template
const mainController = require('../controllers/mainController'); //for the main controller
const router = express.Router();
const {isGuest} = require('../middlewares/auth');// for validating guest or register user

//GET / for landing the home page
router.get('/', isGuest, mainController.landing);// route to the landing page




module.exports = router;
