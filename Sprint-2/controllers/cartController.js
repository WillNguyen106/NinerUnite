const Cart = require('../models/cart');
const Book = require('../models/book');
const Tech = require('../models/tech');
const tech = require('../models/tech');

exports.showcart = (req, res, next) => {
    const user = req.session.user;
    let totalBookPrice = 0;
    let totalTechPrice = 0;
    console.log(user);
    Promise.all([Cart.find({category: "book", userId: user.id}).populate('bookId'), Cart.find({category: "tech", userId: user.id}).populate('techId')])
    .then(results => {
        const[books,techs] = results;
        if(books.length > 0){
            books.forEach(book=>{
                if(book.bookId.id && book.bookId.price != null){
                    totalBookPrice += parseFloat(book.bookId.price);
                }
                
            });
        }else{
            totalBookPrice = 0;
        }

        if(techs.length > 0){
            techs.forEach(tech=>{
                if(tech.techId.id && tech.techId.price != null){
                    totalBookPrice += parseFloat(tech.techId.price);
                }
                
            });
        }else{
            totalBookPrice = 0;
        }

        let empty = true;
        if(books.length > 0 || techs.length > 0){
            empty = false;
        }
        // console.log("Books here");
        // console.log("Techs here");
        res.render('./cart/list', {books, techs, empty, totalBookPrice, totalTechPrice});
    })
    .catch(err => next(err));
   
};

//add a book to the cart by its id: /cart/add/:id/book
exports.addBook = (req, res, next) => {
    let id = req.params.id;
    const user = req.session.user;
    //check if the book item in the cart
    Cart.find()
    .then(items => {
        let filter = items.filter(item=> item.bookId == id && item.userId == user.id);
        if(filter.length != 0){
            // console.log(filter);
            req.flash('error', 'Your selected book item is already in the cart!');
            res.redirect("/cart");
        }else{
            let item = new Cart();
            item.userId = req.session.user.id;
            item.bookId = id;

            item.techId = null;
            item.category = "book"
            item.save()
            .then(item => {
                req.flash('success', 'You have successfully add an book item to the cart!');
                return res.redirect('/books');
            })
            .catch(err => {
                if(err.name === 'ValidationError'){
                    err.status = 400;
                }
                next(err);
    })
        }
    })
    .catch(err => next(err))
    
    
};
//add a book to the cart by its id: /cart/add/:id/book
exports.addTech = (req, res, next) => {
    let id = req.params.id;
    const user = req.session.user;
    //check if the book item in the cart
    Cart.find()
    .then(items => {
        let filter = items.filter(item=> item.techId == id && item.userId == user.id);
        if(filter.length != 0){
            // console.log(filter);
            req.flash('error', 'Your selected tech item is already in the cart!');
            res.redirect("/cart");
        }else{
            let item = new Cart();
            item.userId = req.session.user.id;
            item.techId = id;
            item.bookId = null;
            item.category = "tech"
            item.save()
            .then(item => {
                // console.log(item);
                req.flash('success', 'You have successfully add an tech item to the cart!');
                return res.redirect('/techs');
            })
            .catch(err => {
                if(err.name === 'ValidationError'){
                    err.status = 400;
                }
                next(err);
            })
        }
    })
    .catch(err => next(err))
    
    
};
//delete an item from the cart by its id /cart/delete/:id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    console.log("here in delete");
    //delete from connections collection
    Cart.findByIdAndDelete(id, {useFindAndModify: false})
    .then(cart => {
        // console.log(cart);
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