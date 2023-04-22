const Book = require('../models/book');
const Tech = require('../models/tech');
const Domicile = require('../models/domicile');
const User = require('../models/user');

//check if user is a guest
exports.isGuest = (req, res, next) => {
    if(!req.session.user){
        return next();
    }else {
        req.flash('error', 'You are logged in already!');
        req.session.save((err)=>{
            res.redirect('/users/index');
        });
    }
};
//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    }else {
        req.flash('error', 'You need to log in first!');
        req.session.save((err)=>{
            res.redirect('/users/login');
        });
        
    }
};

// check if the user is the author of the post
exports.isUserBookPost = (req,res,next)=>{
    let id = req.params.id;

    Book.findById(id)
    .then(book=>{
        if(book){
            if(book.user == req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.isUserTechPost = (req,res,next)=>{
    let id = req.params.id;

    Tech.findById(id)
    .then(tech=>{
        if(tech){
            if(tech.user == req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find an tech item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.isUserDomicilePost = (req,res,next)=>{
    let id = req.params.id;

    Domicile.findById(id)
    .then(domicile=>{
        if(domicile){
            if(domicile.user == req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find a domicile with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};
exports.isProfileOwner = (req,res,next)=>{
    let id = req.params.id;

    User.findById(id)
    .then(owner=>{
        if(owner){
            if(owner._id == req.session.user.id){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find the user with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};
