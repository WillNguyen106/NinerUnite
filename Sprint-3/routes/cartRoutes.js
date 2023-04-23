const express = require('express');
const cartController = require('../controllers/cartController');
const {isLoggedIn} = require('../middlewares/auth');// for validating guest or register user



const router = express.Router();

//navigate to the cart: /cart
router.get('/', isLoggedIn, cartController.showcart);
//add a book to the cart by its id: /cart/add/:id/book
router.post('/add/:id/book', isLoggedIn, cartController.addBook)
//add a tech item to the cart by its id: /cart/add/:id/tech
router.post('/add/:id/tech', isLoggedIn, cartController.addTech)
//delete an item from the cart by its id /cart/delete/:id
router.delete('/delete/:id', isLoggedIn, cartController.delete);
//navigate to cart checkout: /cart/checkout
router.get('/checkout', isLoggedIn, cartController.checkout);
//navigate to cart complete transaction /cart/transaction
router.get('/transaction', isLoggedIn, cartController.transaction);

module.exports = router;