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
    tech.user = req.session.user.id;
    
    if(req.file){
        tech.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    };
    
    tech.save()
    .then(result =>res.redirect('/techs'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// Search function for tech product post
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
    
    modelTech.findById(id).populate('user','firstName lastName')// Promise
    .then(tech=>{
        if(tech){return res.render('./tech/show',{tech});
        }else{
            //Error handler
            let err = new Error('Cannot find a tech with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
}


// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    
    modelTech.findById(id)
    .then(tech => {res.render('./tech/edit', {tech});
    })    
    .catch(err => next(err));
};

// Function that update new post
exports.update = (req,res, next)=>{
    let tech = req.body;
    let id = req.params.id;

    if(req.file){
        tech.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
    };
    
    modelTech.findByIdAndUpdate(id, tech,{useFindAndModify: false, runValidators:true})
    .then(tech =>{res.redirect('/techs/' + id);
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

    modelTech.findByIdAndDelete(id, {useFindAndModify: false})
    .then(tech => {return res.redirect('/techs')
    })
    .catch(err=>next(err));
};
