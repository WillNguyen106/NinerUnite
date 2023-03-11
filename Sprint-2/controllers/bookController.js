const { connect } = require('mongoose');
const model = require('../models/book')

// Function that find all books
exports.index = (req, res, next)=>{
    model.find()
    .then(books => {
        res.render('./textbook/books', {books});
    })
    .catch(err => next(err));
}
// Function that create new book post and save new post
exports.new = (req,res)=>{
    res.render('./textbook/new');
};

exports.create = (req,res, next)=>{
    let book = new model(req.body);
    //book.user = req.session.user.id;
    book.save()
    .then(book => {
        res.redirect('/books');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
    
};

// Function that show detail book
exports.show = async (req,res, next)=>{
    try{
        let id = req.params.id;
        let user = req.params.user;
        console.log(user);
        //book.date = DateTime.fromISO(book.date).toLocaleString(DateTime.DATE_MED);
        let book  = await model.findById(id);// Promise
        if(book){
            res.render('./textbook/show',{book});
        }else{
            //Error handler
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            throw err;
        }   
    }catch (err){
        next(err);
    }
    
};

// Function that allow to search book.
exports.search = async (req,res,next)=>{
    let search = req.body.search;// req.body is an object
    let books = await model.find();
    let results = [];
    if(search){
        let author = books.filter((book)=>book.author.toLowerCase().includes(search.toLowerCase()));
        let title = books.filter((book)=>book.title.toLowerCase().includes(search.toLowerCase()));

        let ISBN = books.filter((book)=>book.isbn.includes(search));

        if(author.length > 0){
            console.log(author);
            results =  author;
        }

        if(title.length > 0){
            console.log(title);
            results = title;
        }

        if(ISBN.length > 0){
            results = ISBN;
        }
    }
    res.render('./textbook/search',{books, results, searched:true});
    
}

// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    let book = model.findById(id)
    .then(book => {
        res.render('./textbook/edit', {book});
    })
    .catch(err => next(err));
    
};

// Function that update new post
exports.update = (req,res, next)=>{
    let book = req.body;
    let id = req.params.id;
    model.findByIdAndUpdate(id, book,{useFindAndModify: false, runValidators:true})
    .then(book =>{
        res.redirect('/books/' + id);
    })
    .catch(err => {
        if(err.name = 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// Function that delete post
exports.delete = (req,res, next)=>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(book => {
       res.redirect('/books')
    })
    .catch(err => {
        if(err.name == 'ValidationError'){
            err.status = 400;
        }
        next(err)}
    );
    
};

