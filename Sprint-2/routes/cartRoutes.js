const express = require('express');
const cartController = require('../controllers/cartController');
const {isLoggedIn} = require('../middlewares/auth');// for validating guest or register user



const router = express.Router();

//navigate to the cart: /cart
router.get('/', isLoggedIn, cartController.showcart);
//add a book to the cart by its id: /cart/add/:id/book
router.post('/add/:id/book', isLoggedIn, cartController.addBook)
//delete an item from the cart by its id /cart/delete/:id
router.delete('/:id', isLoggedIn, cartController.delete);

module.exports = router;