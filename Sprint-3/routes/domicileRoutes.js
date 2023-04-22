const express = require('express');
const controllerDomicile = require('../controllers/domicileController');
const {fileUpload} = require('../middlewares/fileUpload');
const {isLoggedIn, isUserDomicilePost} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /domicile: send all domicile posts to the user
router.get('/', controllerDomicile.index);

/*
    *Allow users to create a new domicile post
    *and post their new domicile post
    *Method: GET and POST
*/

//GET /domiciles/new: send HTML form for creating a new domicile to post
router.get('/new',isLoggedIn, controllerDomicile.new);

//POST /domiciles: Post a new domicile for post
router.post('/',isLoggedIn,fileUpload, controllerDomicile.create);

//GET /domiciles/search: Search for domiciles
router.get('/search',isLoggedIn, controllerDomicile.search);

//GET /domiciles/:id: send details of domicile posts indentified by id
router.get('/:id',validateId,controllerDomicile.show);

// /*
//     *Allow users to edit their domicile posts
//     *or update their domicile posts
//     *Method: GET and PUT
// */

//GET /domiciles/:id/edit: send HTML form for editing an existing domicile post
router.get('/:id/edit',validateId,isLoggedIn,isUserDomicilePost,controllerDomicile.edit);

//PUT /domiciles/:id: update the domicile post identified by id
router.put('/:id',validateId,isLoggedIn,fileUpload,isUserDomicilePost,controllerDomicile.update);

//DELETE /domiciles/:id: delete domicile identified by id
router.delete('/:id',validateId,isLoggedIn,isUserDomicilePost,controllerDomicile.delete);


module.exports = router;









