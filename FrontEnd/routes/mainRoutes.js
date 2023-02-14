const express = require('express');// for express template
const mainController = require('../controllers/mainController'); //for the main controller
const router = express.Router();

//GET / for landing the home page
router.get('/', mainController.landing);// route to the landing page



module.exports = router;
