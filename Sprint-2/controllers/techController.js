const tech = require('../models/tech');
const model = require('../models/tech')

// Function that find all techs
exports.index = (req,res,next)=>{
    model.find()
    .then(techs => res.render('./tech/techs',{techs}))
    .catch(err=> next(err));
};

// Function that create new post and save new post
exports.new = (req,res)=>{
    res.render('./tech/new');
};

exports.create = (req,res,next)=>{
    let tech = new model(req.body);
    tech.save()
    .then(tech => res.redirect('/techs'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// Function that show detail book
exports.show = (req,res,next)=>{
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    
    model.findById(id)// Promise
    .then(tech=>{
        if(tech){
            return res.render('./tech/show',{tech});
        }else{
            //Error handler
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

// TODO: Function that allow to search tech.


// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(tech => {
        if(tech){
            res.render('./tech/edit', {tech})
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
    let tech = req.body;
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    
    model.findByIdAndUpdate(id, tech,{useFindAndModify: false, runValidators:true})
    .then(tech =>{
        if(tech){
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
    .then(tech => {
        if(tech){
            return res.redirect('/books')
        }else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
       
    })
    .catch(err=>next(err));
};
