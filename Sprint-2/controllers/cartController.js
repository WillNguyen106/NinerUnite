const Cart = require('../models/cart');



exports.showcart = (req, res) => {
    Cart.find()
    .then(items => {
        res.render('./cart/list', {items});
    })
    .catch(err => next(err));
   
};

//add a book to the cart by its id: /cart/add/:id/book
exports.addBook = (req, res) => {
    let id = req.params.id;
    let item = new Cart();
    item.userId = req.session.user.id;
    item.bookId = id;
    item.category = "book"
    item.save()
    .then(item => {
        console.log(item);
        req.flash('success', 'You have successfully add an book item to the cart!');
        
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
    
};
//add a book to the cart by its id: /cart/add/:id/book
exports.addTech = (req, res) => {
    let id = req.params.id;
    let item = new Cart();
    item.userId = req.session.user.id;
    item.bookId = id;
    item.category = "tech"
    item.save()
    .then(item => {
        console.log(item);
        req.flash('success', 'You have successfully add an tech item to the cart!');
        
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
    
};
//delete an item from the cart by its id /cart/delete/:id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    //delete from connections collection
    Cart.findByIdAndDelete(id, {useFindAndModify: false})
    .then(cart => {
        console.log(cart);
        req.flash('success', 'You have successfully delete an item from the cart!');
    })
    .catch(err => {
        if(err.name == 'ValidationError'){
            err.status = 400;
        }
        next(err)}
    );
    

};