const modelTech = require('../models/tech');
const {DateTime} = require("luxon");

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
    
    if(req.files && req.files.length > 0){
        req.files.forEach(file=>{
            tech.image.push({
                data: file.buffer,
                contentType: file.mimetype,
            });
        });
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
            techs.forEach(tech=>{
                if(tech.brand.toLowerCase().includes(p.toLowerCase())
                    || tech.price.toString().includes(p))
                    {
                        results.push(tech);
                    }
            });
        }
        res.render('./tech/searchTech',{techs, results, p, searched:true});
    })
    .catch(err=>next(err));
}


// Function that show detail tech
exports.show = (req,res,next)=>{
    let id = req.params.id;
    
    modelTech.findById(id).populate('user','firstName lastName').lean()// Promise
    .then(tech=>{
        if(tech){
            tech.createdAt = DateTime.fromJSDate(tech.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
            return res.render('./tech/show',{id,tech});
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

    if(req.files && req.files.length > 0){
        tech.image = tech.image || [];
        req.files.forEach(file=>{
            tech.image.push({
                data: file.buffer,
                contentType: file.mimetype,
            });
        });
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
    .then(tech => {return res.redirect('/users/myPosts');
    })
    .catch(err=>next(err));
};
