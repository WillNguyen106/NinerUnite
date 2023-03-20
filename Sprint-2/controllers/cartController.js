const Cart = require('../models/cart');
const Book = require('../models/book');
const Tech = require('../models/tech');

exports.showcart = (req, res, next) => {
    Promise.all([Cart.find({category: "book"}).populate('bookId'), Cart.find({bookId: null}).populate('techId')])
    .then(results => {
        const[books, techs] = results;
        let empty = true;
        if(books.length > 0 || techs.length > 0){
            empty = false;
        }
        // console.log("Books here");
        // console.log("Techs here");
    
        res.render('./cart/list', {books, techs, empty});
    })
    .catch(err => next(err));
   
};

//add a book to the cart by its id: /cart/add/:id/book
exports.addBook = (req, res, next) => {
    let id = req.params.id;
    let item = new Cart();
    item.userId = req.session.user.id;
    item.bookId = id;

    item.techId = null;
    item.category = "book"
    item.save()
    .then(item => {
        req.flash('success', 'You have successfully add an book item to the cart!');
        console.log(req.hostname);
        return res.redirect('/books');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
    
};
//add a book to the cart by its id: /cart/add/:id/book
exports.addTech = (req, res, next) => {
    let id = req.params.id;
    let item = new Cart();
    item.userId = req.session.user.id;
    item.techId = id;
    item.bookId = null;
    item.category = "tech"
    item.save()
    .then(item => {
        console.log(item);
        req.flash('success', 'You have successfully add an tech item to the cart!');
        return res.redirect('/books');
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
    console.log("here in delete");
    //delete from connections collection
    Cart.findByIdAndDelete(id, {useFindAndModify: false})
    .then(cart => {
        console.log(cart);
        req.flash('success', 'You have successfully delete an item from the cart!');
        res.redirect('/cart');
    })
    .catch(err => {
        if(err.name == 'ValidationError'){
            err.status = 400;
        }
        next(err)}
    );
    

};