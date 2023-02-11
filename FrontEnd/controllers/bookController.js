const model = require('../models/book')

exports.index = (req, res)=>{
    let books = model.find();
    res.render('./textbook/books',{books});
}

exports.new = (req,res)=>{
    res.render('./textbook/new');
};

exports.create = (req,res)=>{
    let book = req.body;
    model.save(book);
    res.redirect('/books');
};

exports.show = (req,res, next)=>{
    //res.render('./textbook/show');
    let id = req.params.id;
    let book  = model.findById(id);
    if(book){
        res.render('./textbook/show',{book});
    }else{
        //Error handler
       let err = new Error('Cannot find a story with id ' + id);
       err.status = 404;
       next(err);
    }   
};

exports.edit = (req,res, next)=>{
    let id = req.params.id;
    let book  = model.findById(id);
    if(book){
        res.render('./textbook/edit',{book});
    }else{
        //Error handler
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
    //res.render('./textbook/edit');
    
};

exports.update = (req,res, next)=>{
    let book = req.body;
    let id = req.params.id;
    if(model.updateById(id, book)){
        res.redirect('/books/' + id);
    }else{
        //Error handler
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req,res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/books');
    }else{
        //Error handler
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
};