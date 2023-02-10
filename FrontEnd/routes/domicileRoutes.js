
// const express = require('express');
// const controller = require('../controllers/domicileController');

// const router = express.Router();

// //GET /domicile: send all domiciles to the user
// router.get('/', controller.index);

// /*
//     *Allow users to create a new domicile post
//     *and post their new domicile
//     *Method: GET and POST
// */
// //GET /domiciles/newdomicile: send HTML form for creating a new domicile to rent
// router.get('/newdomicile', controller.new);

// //POST /domiciles: Post a new domicile for renting
// router.post('/', controller.create);

// //GET /domiciles/:id: send details of domicile indentified by id
// router.get('/:id', controller.show);

// /*
//     *Allow users to edit their domicle post
//     *or update their domicle post
//     *Method: GET and PUT
// */
// //GET /domiciles/:id/edit: send HTML form for editing an existing domicile post
// router.get('/:id/edit', controller.edit);

// //PUT /domiciles/:id: update the domicle post identified by id
// router.put('/:id', controller.update);

// //DELETE /domiciles/:id: delete tech product identified by id
// router.delete('/:id', controller.delete);


// module.exports = router;