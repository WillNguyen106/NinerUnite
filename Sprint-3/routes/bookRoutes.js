const express = require('express');
const controllerBook = require('../controllers/bookController');
const {fileUpload} = require('../middlewares/fileUpload');
<<<<<<< Updated upstream
const {isLoggedIn, isUserBookPost} = require('../middlewares/auth');
=======
const {isLoggedIn, isUserPost} = require('../middlewares/auth');
>>>>>>> Stashed changes
const {validateId} = require('../middlewares/validator');


const router = express.Router();

//GET /textbooks: send all textbooks products to the user
router.get('/', controllerBook.index);

/*
    *Allow users to create a new textbook post
    *and post their new textbook
    *Method: GET and POST
*/

//GET /books/newtextbook: send HTML form for creating a new textbook to sell
router.get('/new',isLoggedIn,controllerBook.new);

//POST /books: Post a new textbook for selling
router.post('/',isLoggedIn,fileUpload, controllerBook.create);

router.get('/search', isLoggedIn, controllerBook.search);

//GET /books/:id: send details of textbook product indentified by id
router.get('/:id',validateId, controllerBook.show);

// /*
//     *Allow users to edit their textbook post
//     *or update their textbook post
//     *Method: GET and PUT
// */

//GET /books/:id/edit: send HTML form for editing an existing textbook post
<<<<<<< Updated upstream
router.get('/:id/edit',validateId,isLoggedIn,isUserBookPost,controllerBook.edit);

//PUT /books/:id: update the textbook post identified by id
router.put('/:id',validateId,isLoggedIn,isUserBookPost,fileUpload, controllerBook.update);

//DELETE /books/:id: delete textbook identified by id
router.delete('/:id',validateId,isLoggedIn,isUserBookPost,controllerBook.delete);
=======
router.get('/:id/edit',validateId,isLoggedIn,isUserPost,controllerBook.edit);

//PUT /books/:id: update the textbook post identified by id
router.put('/:id',validateId,isLoggedIn,isUserPost,fileUpload, controllerBook.update);

//DELETE /books/:id: delete textbook identified by id
router.delete('/:id',validateId,isLoggedIn,isUserPost,controllerBook.delete);
>>>>>>> Stashed changes


module.exports = router;