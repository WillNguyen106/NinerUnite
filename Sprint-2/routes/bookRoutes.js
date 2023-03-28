const express = require('express');
const controllerBook = require('../controllers/bookController');
const {fileUploadBook} = require('../middlewares/fileUploadBook');


const router = express.Router();

//GET /textbooks: send all textbooks products to the user
router.get('/', controllerBook.index);

/*
    *Allow users to create a new textbook post
    *and post their new textbook
    *Method: GET and POST
*/

//GET /books/newtextbook: send HTML form for creating a new textbook to sell
router.get('/new', controllerBook.new);

//POST /books: Post a new textbook for selling
router.post('/',fileUploadBook, controllerBook.create);

//GET /books/:id: send details of textbook product indentified by id
router.get('/:id',controllerBook.show);


router.post('/search', controllerBook.search);

// /*
//     *Allow users to edit their textbook post
//     *or update their textbook post
//     *Method: GET and PUT
// */

//GET /books/:id/edit: send HTML form for editing an existing textbook post
router.get('/:id/edit', controllerBook.edit);

//PUT /books/:id: update the textbook post identified by id
router.put('/:id',fileUploadBook, controllerBook.update);

//DELETE /books/:id: delete textbook identified by id
router.delete('/:id', controllerBook.delete);


module.exports = router;

// This is a test comment for github