const model = require('../models/book');
const user = require('../models/user');

// Function that find all books
exports.index = (req, res, next)=>{
    model.find()
    .then(books => res.render('./textbook/books', {books}))
    .catch(err => next(err));
}
// Function that create new book post and save new post
exports.new = (req,res)=>{
    res.render('./textbook/new');
};

exports.create = (req,res, next)=>{
    let book = new model(req.body);
    book.user = req.session.user.id;
    book.save()
    .then(book =>res.redirect('/books'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
    
};
//book.date = DateTime.fromISO(book.date).toLocaleString(DateTime.DATE_MED);
// Function that show detail book
exports.show = (req,res, next)=>{
    let id = req.params.id;
    let selectUserId = req.session.user.id;
    let userIdArray = [];
    
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)// Promise
    .then(book=>{
        if(book){
            userIdArray.push(selectUserId);
            console.log(userIdArray);
            return res.render('./textbook/bookDetail',{book, users:userIdArray,selectUserId:book.user});
        }else{
            //Error handler
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

// Function that allow to search book.
exports.search = (req,res,next)=>{
    let search = req.body.search;// req.body is an object
    
    model.find()
    .then(books=>{
        let results = [];
        if(search){
            let author = books.filter((book)=>book.author.toLowerCase().includes(search.toLowerCase()));
            let title = books.filter((book)=>book.title.toLowerCase().includes(search.toLowerCase()));
            let ISBN = books.filter((book)=>book.isbn.includes(search));

            if(author.length > 0){
                results =  author;
            }

            if(title.length > 0){
                results = title;
            }

            if(ISBN.length > 0){
                results = ISBN;
            }
        }
        res.render('./textbook/search',{books, results, searched:true});
    })
    .catch(err=>next(err));
    
    
}

// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(book => {
        if(book){
            res.render('./textbook/edit', {book})
        } else {
            let err = new Error('Cannot find a story with id ' + id)
            err.status = 404;
            next(err);
        }
    })    
    .catch(err => next(err));
};

// Function that update new post
exports.update = (req,res, next)=>{
    let book = req.body;
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    
    model.findByIdAndUpdate(id, book,{useFindAndModify: false, runValidators:true})
    .then(book =>{
        if(book){
            res.redirect('/books/' + id);
        }else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
        
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

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(book => {
        if(book){
            return res.redirect('/books')
        }else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
       
    })
    .catch(err=>next(err));
};



