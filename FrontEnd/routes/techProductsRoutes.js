// const express = require('express');
// const controller = require('../controllers/techProductsController');

// const router = express.Router();

// //GET /techproducts: send all textbooks products to the user
// router.get('/', controller.index);

// /*
//     *Allow users to create a new tech product post
//     *and post their new tech product
//     *Method: GET and POST
// */

// //GET /techproducts/newtechproduct: send HTML form for creating a new tech product to sell
// router.get('/newtechproduct', controller.new);

// //POST /techproducts: Post a new tech product for selling
// router.post('/', controller.create);

// //GET /techproducts/:id: send details of tech product indentified by id
// router.get('/:id', controller.show);

// /*
//     *Allow users to edit their tech product post
//     *or update their tech product post
//     *Method: GET and PUT
// */

// //GET /techproducts/:id/edit: send HTML form for editing an existing tech product post
// router.get('/:id/edit', controller.edit);

// //PUT /techproducts/:id: update the tech product post identified by id
// router.put('/:id', controller.update);

// //DELETE /techproducts/:id: delete tech product identified by id
// router.delete('/:id', controller.delete);


// module.exports = router;