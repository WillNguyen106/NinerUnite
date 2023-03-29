const modelBooks = require('../models/book');
const User = require('../models/user');



exports.index = (req, res) => {
    // console.log(req.flash());
    // res.render('./user/index');

    modelBooks.find()
    .then(books => res.render('./user/index', {books}))
    .catch(err => next(err));
};

//routes to login page
exports.login = (req, res) => {
    console.log(req.flash());
    res.render('./user/login');//route to login page
};
exports.signup =  (req, res) => {
        res.render('./user/signup');//route to signup page
}; 
//create new User from infor retrieved in signup page
exports.newUser =  (req, res, next) => {  
    // console.log(req.body);
    if(req.body.password != req.body.cfpassword){
        console.log('Your password is not being matched!');
        req.flash('error', 'Your passwords do not match!');
        return res.redirect('/users/signup');//route to signup page
    }else {
        let user = new User(req.body);
   
        if(user.email){
            user.email = user.email.toLowerCase();
        }
        user.save()
        .then(() => res.redirect('/users/login'))//route to login page
        .catch(err => {
            if(err.name === 'ValidationError'){
                req.flash('error', err.message);
                return res.redirect('/users/signup');
            }
            if(err.code === 11000){
                req.flash('error', 'Email address has been used');
                return res.redirect('/users/signup');//route to signup page
            }
            next(err);
        });
    }
    
}; 
//check in and login into as user enter the account credentials
exports.process =  (req, res, next) => {  
    
    //authenticate user login request
    let email = req.body.email;
    if(email){
        email = email.toLowerCase();
    }
    let password = req.body.password;
    //get the user that matches the email
    User.findOne({email: email})
    .then(user =>{
        if(user){
            //find the user in the DB
            user.comparePassword(password)
            .then(result => {
                if(result) {
                    req.session.user = {id: user._id, firstName: user.firstName, lastName: user.lastName};// store user._id and firstName and lastName in the session 
                    // console.log(req.session.user);
                    req.flash('success', 'You have successfully logged in!');
                    res.redirect('./index');
                }else{
                    //console.log('Wrong password!');
                    req.flash('error', 'Wrong password!')
                    res.redirect('./login');
                }
            })
            .catch(err => next(err));
        } else {
            //console.log("Wrong email address!");
            req.flash('error', 'Wrong email address!')
            res.redirect('./login');
        }
    })
    .catch(err => next(err));
}; 
exports.profile =  (req, res) => {
    res.render('./user/profile');//route to signup page
}; 
// for logout functionality
exports.logout = (req, res, next) => { 

    req.session.destroy(err => {
        if(err){
            return next(err);
        }else {
            res.redirect('./login');// go back to the login page when logged out.
        }
    });
} ;

exports.test =(req,res)=>{
    res.render('./textbook/search');
};