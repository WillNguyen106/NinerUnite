const Cart = require('../models/cart');

exports.showcart = (req, res, next) => {
    const user = req.session.user;
    let totalBookPrice = 0;
    let totalTechPrice = 0;
    // console.log(user);
    Promise.all([Cart.find({category: "book", userId: user.id}).populate('bookId'), Cart.find({category: "tech", userId: user.id}).populate('techId')])
    .then(results => {
        const[books,techs] = results;
        let totalCost = totalPriceOfItems(books, techs);
        let empty = true;
        if(books.length > 0 || techs.length > 0){
            empty = false;
        }

        //to list.ejs, we are returning books and techs arrays, empty boolean
        //total price of all books and total price of all tech items
        res.render('./cart/list', {books, techs, empty, totalCost});
    })
    .catch(err => next(err));
   
};

//helper function that sums up prices of items in cart
function totalPriceOfItems (bookArr, techArr) {
        
        let totalBookPrice = 0;
        let totalTechPrice = 0;

        //calculate the total book price for each book, if the book exists
        if(bookArr.length > 0){

                bookArr.forEach(book => {
    
                    //if it is null, that means it has been deleted
                    if(book.bookId != null){
                        totalBookPrice += parseFloat(book.bookId.price);
                    }
    
                });
    
            }else{
                totalBookPrice = 0;
            }
    
            //calculate the total tech price for each tech item, if the tech item exists
            if(techArr.length > 0){
    
                techArr.forEach(tech => {
    
                    //if it is null, that means it has been deleted
                    if(tech.techId != null){
                        totalTechPrice += parseFloat(tech.techId.price);
                    }
    
                });
    
            }else{
                totalTechPrice = 0;
            }

            let roundedTotal = Math.round((totalBookPrice + totalTechPrice) * 100) / 100;

    return roundedTotal;

}

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
            req.session.save((err)=>{
                res.redirect("/cart");
            });
        }else{
            let item = new Cart();
            item.userId = req.session.user.id;
            item.bookId = id;
            item.docModel = 'Book';

            item.techId = null;
            item.category = "book"
            item.save()
            .then(item => {
                req.flash('success', 'You have successfully add an book item to the cart!');
                // Update Item count after successfully
                req.session.save((err)=>{
                    req.session.user.ItemsCount += 1;
                    return res.redirect('/books');
                });   
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
            req.session.save((err)=>{
                res.redirect("/cart");
            });
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
                // Update Item count after successfully
                req.session.save((err)=>{
                    req.session.user.ItemsCount += 1;
                    return res.redirect('/techs');
                });
                
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
        // Update Item count after successfully
        req.session.save((err)=>{
            req.session.user.ItemsCount -= 1;
            res.redirect('/cart');
        });
    })
    .catch(err => {
        if(err.name == 'ValidationError'){
            err.status = 400;
        }
        next(err)}
    );
    

};

exports.checkout = (req, res, next) => {
    //get user session information
    const user = req.session.user;

    //find all of the user's cart information to display in payment page
    Promise.all([Cart.find({category: "book", userId: user.id}).populate('bookId'), Cart.find({category: "tech", userId: user.id}).populate('techId')])
    .then(results => {
        const[books,techs] = results;
        let totalCost = totalPriceOfItems(books, techs);
        let empty = true;
        if(books.length > 0 || techs.length > 0){
            empty = false;
        }

        //to payment.ejs, we are returning books and techs arrays, empty boolean
        //total price of all books and total price of all tech items
        res.render('./cart/payment', {books, techs, empty, totalCost});
    })
    .catch(err => next(err));

};
