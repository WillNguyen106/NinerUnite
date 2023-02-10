const model = require('../models/textbook')

exports.index = (req, res)=>{
    res.render('./textbook/books');
}

exports.new = (req,res)=>{
    res.render('./textbook/newpost');
};

exports.create = (req,res)=>{
    res.redirect('/books');
};

exports.show = (req,res, next)=>{
    res.render('./textbook/show');
    // let id = req.params.id;
    // let book  = model.findById(id);
    // if(book){
    //     res.render('./textbook/show');
    // }else{
    //     //Error handler
    //    let err = new Error('Cannot find a story with id ' + id);
    //    err.status = 404;
    //    next(err);
    // }   
};

exports.edit = (req,res, next)=>{
    // let id = req.params.id;
    // let story  = model.findById(id);
    // if(story){
    //     res.render('./textbook/editpost',{book});
    // }else{
    //     //Error handler
    //     let err = new Error('Cannot find a story with id ' + id);
    //     err.status = 404;
    //     next(err);
    // }
    res.render('./textbook/editpost');
    
};

exports.update = (req,res, next)=>{
    let story = req.body;
    let id = req.params.id;
    if(model.updateById(id, story)){
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