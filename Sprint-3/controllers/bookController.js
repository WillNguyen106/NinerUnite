const modelBook = require('../models/book');

// Function that find all books
exports.index = (req, res, next)=>{
    modelBook.find()
    .then(books => res.render('./textbook/books', {books}))
    .catch(err => next(err));
}
// Function that create new book post and save new post
exports.new = (req,res)=>{
    res.render('./textbook/new');
};

// Function that save a new book post
exports.create = (req,res, next)=>{
    let book = new modelBook(req.body);

    if(req.file){
        book.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    };
    book.user = req.session.user.id;
    
    book.save()
    .then(results =>res.redirect('/books'))
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
            let author = books.filter((book)=>book.author.toLowerCase().includes(q.toLowerCase()));
            let title = books.filter((book)=>book.title.toLowerCase().includes(q.toLowerCase()));
            let ISBN = books.filter((book)=>book.isbn.includes(q));

            ISBN.forEach(book => {
                results.push(book);
            });
            
            author.forEach(book => {
                results.push(book);
            });
    
            title.forEach(book => {
                results.push(book);
            });
            
        }
        res.render('./textbook/searchBook',{books, results, searched:true});
    })
    .catch(err=>next(err));
    
    
}

// Function that show detail book
exports.show = (req,res, next)=>{
    let id = req.params.id;
    let selectUserId = req.session.user.id;
    let userIdArray = [];
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }
    modelBook.findById(id)// Promise
    .then(book=>{
        if(book){
            userIdArray.push(selectUserId);
            return res.render('./textbook/show',{book, users:userIdArray,selectUserId:book.user});
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
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }

    modelBook.findById(id)
    .then(book => {
        if(book){
            res.render('./textbook/edit', {book})
        } else {
            let err = new Error('Cannot find a book with id ' + id)
            err.status = 404;
            next(err);
        }
    })    
    .catch(err => next(err));
};

// Function that update new post
exports.update = (req,res, next)=>{
    let book = req.body;
    //console.log(book);
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }
    
    if(req.file){
        book.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    }

    modelBook.findByIdAndUpdate(id, book,{useFindAndModify: false, runValidators:true})
    .then(result =>{
        if(result){
            res.redirect('/books/' + id);
        }else{
            let err = new Error('Cannot find a book with id ' + id);
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
        let err = new Error('Invalid book id');
        err.status = 400;
        return next(err);
    }

    modelBook.findByIdAndDelete(id, {useFindAndModify: false})
    .then(result => {
        if(result){
            return res.redirect('/books')
        }else{
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
       
    })
    .catch(err=>next(err));
};



