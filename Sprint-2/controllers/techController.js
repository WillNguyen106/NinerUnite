const tech = require('../models/tech');
const modelTech = require('../models/tech');

// Function that find all techs
exports.index = (req, res, next)=>{
    modelTech.find()
    .then(techs => res.render('./tech/techs',{techs}))
    .catch(err => next(err));
};

// Function that create new tech post and save new post
exports.new = (req,res)=>{
    res.render('./tech/new');
};

exports.create = (req,res,next)=>{
    let tech = new modelTech(req.body);
    if(req.file){
        tech.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    };
    tech.user = req.session.user.id;


    tech.save()
    .then(result =>res.redirect('/techs'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// TODO: search function for tech product post
exports.search = (req,res,next)=>{
    let p = req.query.p;// req.body is an object
    
    modelTech.find({p}).exec()
    .then(techs=>{
        let results = [];
        if(p){
            let brand = techs.filter((tech)=>tech.brand.toLowerCase().includes(p.toLowerCase()));            

            brand.forEach(tech => {
                results.push(tech);
            });
        }
        res.render('./tech/searchTech',{techs, results, searched:true});
    })
    .catch(err=>next(err));
}


// Function that show detail tech
exports.show = (req,res,next)=>{
    let id = req.params.id;
    let selectUserId = req.session.user.id;
    let userIdArray = [];
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    
    modelTech.findById(id)// Promise
    .then(tech=>{
        if(tech){
            userIdArray.push(selectUserId)
            return res.render('./tech/show',{tech, users:userIdArray, selectUserId:tech.user});
        }else{
            //Error handler
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
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

    modelTech.findById(id)
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

    if(req.file){
        tech.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    };
    
    modelTech.findByIdAndUpdate(id, tech,{useFindAndModify: false, runValidators:true})
    .then(result =>{
        if(result){
            res.redirect('/techs/' + id);
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

    modelTech.findByIdAndDelete(id, {useFindAndModify: false})
    .then(result => {
        if(result){
            return res.redirect('/techs')
        }else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
       
    })
    .catch(err=>next(err));
};
