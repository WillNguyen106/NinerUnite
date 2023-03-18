const express = require('express');
const controller = require('../controllers/bookController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');

const router = express.Router();

//GET /textbooks: send all textbooks products to the user
router.get('/', controller.index);

/*
    *Allow users to create a new textbook post
    *and post their new textbook
    *Method: GET and POST
*/

//GET /books/newtextbook: send HTML form for creating a new textbook to sell
router.get('/new', controller.new);

//POST /books: Post a new textbook for selling
router.post('/', controller.create);

//GET /books/:id: send details of textbook product indentified by id
router.get('/:id',controller.show);


router.post('/search', controller.search);

// /*
//     *Allow users to edit their textbook post
//     *or update their textbook post
//     *Method: GET and PUT
// */

//GET /books/:id/edit: send HTML form for editing an existing textbook post
router.get('/:id/edit', controller.edit);

//PUT /books/:id: update the textbook post identified by id
router.put('/:id', controller.update);

//DELETE /books/:id: delete textbook identified by id
router.delete('/:id', controller.delete);


module.exports = router;