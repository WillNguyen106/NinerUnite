const express = require('express');
const controllerSearch = require('../controllers/searchController');

const router = express.Router()

router.get('/',controllerSearch.search);



module.exports = router;