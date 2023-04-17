const User = require('../models/user');
const modelBook = require('../models/book');
const modelTech = require('../models/tech');
const modelCart = require('../models/cart');

//const modelDomicile = require('../models/book');



exports.index = (req, res,next) => {
    // this will retrieve the number of books currently in the database
    // to display on the front page
    modelBook.find()
    .then(books=>{
        res.render('./user/index',{books})
    })
    .catch(err=>next(err))
};

//routes to login page
exports.login = (req, res) => {
    res.render('./user/login');//route to login page
};
exports.signup =  (req, res) => {
        res.render('./user/signup');//route to signup page
}; 
//create new User from infor retrieved in signup page
exports.newUser =  (req, res, next) => {  
    // console.log(req.body);
    if(req.body.password != req.body.cfpassword){
        req.flash('error', 'Your passwords do not match!');
        req.session.save((err)=>{
            return res.redirect('/users/signup');//route to signup page
        });
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
                req.session.save((err)=>{
                    return res.redirect('/users/signup');
                });
                
            }
            if(err.code === 11000){
                req.flash('error', 'Email address has been used');
                req.session.save((err)=>{
                    return res.redirect('/users/signup');//route to signup page
                });
                
            }
            next(err);
        });
    }
    
}; 
//check in and login into as user enter the account credential
exports.process =  (req, res, next) => {  
    //when the user is logged in, store the items in their cart
                    //into req.session.user
                    //retrieving the cart items by using the method used in the
                    //showCart method in cartController

                   

                    //console.log("numOfCartItems: " + numOfCartItems);
    /*
    In the seession, it will store user id, user name, and user cart list.
    We need to get all the items in the cart and store it in the user session
    */
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
                    let numOfCartItems = 0;
                    Promise.all([modelCart.find({category: "book", userId: user._id}).populate('bookId'), modelCart.find({category:"tech", userId: user._id}).populate("techId")])
                    .then(results => {
                        const [books,techs] = results;
                        numOfCartItems = books.length + techs.length;
                        req.session.user = {id: user._id, firstName: user.firstName, lastName: user.lastName,
                             ItemsCount: numOfCartItems};// store user._id and firstName and lastName in the session 
                        req.flash('success', 'You have successfully logged in!');
                        req.session.save((err)=>{
                            res.redirect('./index');
                        });
                        
                    })
                    .catch(err=>next(err));
                }else{
                    req.flash('error', 'Wrong password!')
                    return res.redirect('./login');
                   
                }

            })
            .catch(err => next(err));
        } else {
            //console.log("Wrong email address!");
            req.flash('error', 'Wrong email address!')
            return res.redirect('./login');
        }
    })
    .catch(err => next(err));
};
//for the owner of the profile
exports.profile =  (req, res, next) => {
    let id = req.params.id;
    Promise.all([User.findOne({_id: id}), modelBook.find({user: id}), modelTech.find({user: id})])
    .then(results => {
        const[profile, books,techs] = results;
        let postNum = books.length + techs.length;
    //    console.log(postNum);
        //console.log(profile);
        res.render('./user/profile', {profile, books,techs, postNum});
    })
    .catch(err => next(err));
};
//for access the edit profile page
exports.edit =  (req, res, next) => {
    let id = req.params.id;
    User.findById(id)
    .then(profile => {
        if(profile){
            req.flash('success', 'Successfully uploaded the profile');
            res.render('./user/editProfile', {profile})
        } else {
            let err = new Error('Cannot find a User with id ' + id)
            err.status = 404;
            next(err);
        }
    })    
    .catch(err => next(err));
    
};


//update my profile
exports.updateProfile = (req, res, next) => {
    let profile = req.body;
    if(req.file){
        profile.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    }
    let id = req.params.id; 
    User.findByIdAndUpdate(id, profile,{useFindAndModify: false, runValidators:true})
    .then(result =>{
        if(result){
            res.redirect('/users/profile/' + id);
        }else{
            let err = new Error('Cannot find a User with id ' + id);
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
}

exports.myPosts = (req, res, next) => {
    let id = req.session.user.id;
    Promise.all([User.find({_id: id}), modelBook.find({user: id}), modelTech.find({user: id})])
    .then(results => {
        const[profile, books,techs] = results;
        let postNum = books.length + techs.length;
    //    console.log(postNum);
        res.render('./user/myPosts', {profile, books,techs, postNum});
    })
    .catch(err => next(err));


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