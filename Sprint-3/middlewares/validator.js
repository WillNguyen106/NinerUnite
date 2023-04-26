const {body} = require('express-validator');
const {validationResult} = require('express-validator');
//check if the route parameter is a valid objectId value
exports.validateId = (req,res,next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    }else{
        let err = new Error('Invalid post id');
        err.status = 400;
        return next(err);
    }
};

exports.validateSignUp = [
    body('firstName','First name cannot be empty').notEmpty().trim().escape(),
    body('lastName','Last name cannot be empty').notEmpty().trim().escape(),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid').trim().escape().normalizeEmail(),
    body('password','Password must be at least 8 chacracters and at most 64 characters').isLength({min: 8,max: 64})
];

exports.validateLogIn = [
    body('email','Email is not valid').isEmail().trim().escape().normalizeEmail(),
    body('password','Password must be at least 8 chacracters and at most 64 characters').isLength({min: 8,max: 64})
];

exports.validateResult = (req,res,next)=>{
    let errors = validationResult(req);
    
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error',error.msg);
        });
        req.session.save((err)=>{
            return res.redirect('back');
        })
    }else{
        return next();
    }
};