const express = require('express');
const controller = require('../controllers/techController');
const {fileUpload} = require('../middlewares/fileUpload');

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

//POST /techs: Post a new tech item for selling
router.post('/', fileUpload, controller.create);

//GET /techs/:id: send details of textbook product indentified by id
router.get('/:id', controller.show);


//router.post('/search', controller.search);

// /*
//     *Allow users to edit their textbook post
//     *or update their textbook post
//     *Method: GET and PUT
// */

//GET /techs/:id/edit: send HTML form for editing an existing tech post
router.get('/:id/edit', controller.edit);

//PUT /techs/:id: update the tech post identified by id
router.put('/:id', fileUpload, controller.update);

//DELETE /techs/:id: delete tech identified by id
router.delete('/:id', controller.delete);


module.exports = router;