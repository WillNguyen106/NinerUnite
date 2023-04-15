const Book = require('../models/book');

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

// check if the user is author of the story
exports.isUserPost = (req,res,next)=>{
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
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


