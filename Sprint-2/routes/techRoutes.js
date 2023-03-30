const express = require('express');
const controllerTech = require('../controllers/techController');
const {fileUpload} = require('../middlewares/fileUpload');

const router = express.Router();

//GET /techs: send all textbooks products to the user
router.get('/', controllerTech.index);

// /*
//     *Allow users to create a new textbook post
//     *and post their new textbook
//     *Method: GET and POST
// */

//GET /books/newtextbook: send HTML form for creating a new textbook to sell
router.get('/new', controllerTech.new);

// //POST /techs: Post a new tech item for selling
router.post('/', fileUpload, controllerTech.create);

router.get('/search', controllerTech.search);

//GET /techs/:id: send details of tech product indentified by id
router.get('/:id', controllerTech.show);

// // /*
// //     *Allow users to edit their textbook post
// //     *or update their textbook post
// //     *Method: GET and PUT
// // */

//GET /techs/:id/edit: send HTML form for editing an existing tech post
router.get('/:id/edit', controllerTech.edit);

//PUT /techs/:id: update the tech post identified by id
router.put('/:id', fileUpload, controllerTech.update);

//DELETE /techs/:id: delete tech identified by id
router.delete('/:id', controllerTech.delete);


module.exports = router;