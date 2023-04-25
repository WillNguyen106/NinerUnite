const book = require('../models/book');
const modelBook = require('../models/book');
const modelCart = require('../models/cart');
const {DateTime} = require("luxon");

// Function that find all books
exports.index = (req, res, next)=>{
    //ge the filtering options from the query
    const filterByPrice = req.query.price;
    const filterBySubject = req.query.subject;

    let results = [];
    const filterOptions ={
        '1-20' : book=>book.price >=1 && book.price <= 20,
        '20-50' : book=>book.price > 20 && book.price <= 50,
        '50-100' : book=>book.price > 50 && book.price <= 100,
        '100+' : book=>book.price > 100,
        'accounting': book=>book.subject.toLowerCase().includes(filterBySubject.toLowerCase()),
        'computer-science': book=>book.subject.toLowerCase().split(' ').join('-').includes(filterBySubject.toLowerCase()),
        'marketing': book=>book.subject.toLowerCase().includes(filterBySubject.toLowerCase()),
    }

    modelBook.find()
    .then(books => {
        //first filter by price
        if(filterByPrice && filterOptions[filterByPrice]){
            results = books.filter(filterOptions[filterByPrice]);
        }
        //then filter the previous results by subject
        if(filterBySubject && filterOptions[filterBySubject]){
            results = results.filter(filterOptions[filterBySubject]);
        }
        console.log(results)
        //results = books.filter(filterOptions[filterBooks]);
        res.render('./textbook/books', {books, results, filterByPrice, filterBySubject});
    })
    .catch(err => next(err));
}

// Function that create new book post and save new post
exports.new = (req,res)=>{
    res.render('./textbook/new');
};

// Function that save a new book post
exports.create = (req,res, next)=>{
    let book = new modelBook(req.body);
    book.user = req.session.user.id;
    // Upload multiple images into array object of image in the book schema
    // if req.files is exist, we need a forEach loop to push each image object into the array object of image field 
    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            book.image.push({
            data: file.buffer,
            contentType: file.mimetype
            });
        });
    }
    
    book.save()
    .then(results =>{
        req.flash('success', "Successfully post a new book item!")
        res.redirect('/books')})
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// Function that allow to search book.
exports.search = (req,res,next)=>{
    
    let q = req.query.q;// req.body is an object
    
    modelBook.find({q}).exec()
    .then(books=>{
        let results = [];
        if(q){
            books.forEach(book=>{
                if(book.author.toLowerCase().includes(q.toLowerCase())
                    || book.title.toLowerCase().includes(q.toLowerCase())
                    || book.isbn.includes(q))
                    {
                        results.push(book);
                    }
            });
        }
        res.render('./textbook/searchBook',{books, results, q, searched:true});
    })
    .catch(err=>next(err));
    
    
}

// Function that show detail book
exports.show = (req,res, next)=>{
    let id = req.params.id;
    
    modelBook.findById(id).populate('user','firstName lastName').lean()// Promise
    .then(book=>{
        if(book){
            book.createdAt = DateTime.fromJSDate(book.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
            return res.render('./textbook/show',{id,book});
        }else{
            //Error handler
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};



// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    
    modelBook.findById(id)
    .then(book => {res.render('./textbook/edit', {book})
    })    
    .catch(err => next(err));
};

// Function that update new post
exports.update = (req,res, next)=>{
    let id = req.params.id;
    let book = req.body;
    
    if (req.files && req.files.length > 0) {
        // Initialize variable book.image first
        book.image = book.image || [];
        req.files.forEach(file => {
            book.image.push({
            data: file.buffer,
            contentType: file.mimetype
            });
        });
    }

    modelBook.findByIdAndUpdate(id, book,{useFindAndModify: false, runValidators:true})
    .then(book =>{res.redirect('/books/' + id);
    })
    .catch(err => {
        if(err.name = 'ValidationError'){
            err.status = 400;
            next(err);
        }
    });
};

// Function that delete post
exports.delete = (req,res, next)=>{
    let id = req.params.id;
    
    modelBook.findByIdAndDelete(id, {useFindAndModify: false})
    .then(tech => {
        //delete from cart collection
        modelCart.deleteMany({bookId: id})
        .then(()=> {return res.redirect('/users/myPosts');})
        .catch(err => {
            if(err.name == 'ValidationError'){
                err.status = 400;
            }
            next(err)}
        );    
    
    })
    .catch(err=>next(err));
};

// Function filterBooks
function filterItems(filterBooks){

}


