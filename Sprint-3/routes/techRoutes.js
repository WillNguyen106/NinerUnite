const express = require('express');
const controllerTech = require('../controllers/techController');
const {fileUpload} = require('../middlewares/fileUpload');
const {isLoggedIn, isUserTechPost} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /techs: send all tech products to the user
router.get('/', controllerTech.index);

/*
    *Allow users to create a new tech post
    *and post their new tech
    *Method: GET and POST
*/

//GET /techs/new: send HTML form for creating a new tech to sell
router.get('/new',isLoggedIn, controllerTech.new);

// //POST /techs: Post a new tech item for selling
router.post('/',isLoggedIn, fileUpload, controllerTech.create);

router.get('/search',isLoggedIn, controllerTech.search);

//GET /techs/:id: send details of tech product indentified by id
router.get('/:id',validateId, controllerTech.show);

/*
    *Allow users to edit their tech post
    *or update their tech post
    *Method: GET and PUT
*/

//GET /techs/:id/edit: send HTML form for editing an existing tech post
router.get('/:id/edit',validateId,isLoggedIn,isUserTechPost,controllerTech.edit);

//PUT /techs/:id: update the tech post identified by id
router.put('/:id',validateId,isLoggedIn,isUserTechPost,fileUpload, controllerTech.update);

//DELETE /techs/:id: delete tech identified by id
router.delete('/:id',validateId,isLoggedIn,isUserTechPost,controllerTech.delete);


module.exports = router;