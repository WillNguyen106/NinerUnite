const domicile = require("../models/domicile");
const modelDomicile = require("../models/domicile");
const {DateTime} = require("luxon");

// Function that find all domiciles
exports.index = (req,res,next)=>{
    const filterDomiciles = req.query.filterTechs;
    let results = [];
    const filterOptions ={
        '1-100' : domicile=>domicile.price >=1 && domicile.price <= 100,
        '100-300' : domicile=>domicile.price > 100 && domicile.price <= 300,
        '300-600' : domicile=>domicile.price > 300 && domicile.price <= 600,
        '600+' : domicile=>domicile.price > 600,
        'samsung': domicile=>domicile.brand.toLowerCase().includes(filterDomiciles.toLowerCase()),
        'apple': domicile=>domicile.brand.toLowerCase().split(' ').join('-').includes(filterDomiciles.toLowerCase()),
        'microsoft': domicile=>domicile.brand.toLowerCase().includes(filterDomiciles.toLowerCase()),
    }
    modelDomicile.find()
    .then(domiciles=>{
        if(filterDomiciles && filterOptions[filterDomiciles]){
            results = domiciles.filter(filterOptions[filterDomiciles]);
        }
        res.render('./domicile/domiciles',{domiciles,results,filterDomiciles})
    })
    .catch(err=>next(err));
}

// Function that create new domicle post and save new post
exports.new = (req,res)=>{
    res.render('./domicile/new');
};

// Function that save a new domicile post
exports.create = (req,res, next)=>{
    let domicile = new modelDomicile(req.body);
    domicile.user = req.session.user.id;
    
    // Image upload
    if(req.files && req.files.length > 0){
        req.files.forEach(file=>{
            domicile.image.push({
                data: file.buffer,
                contentType: file.mimetype,
            });
        });
    };
    
    domicile.save()
    .then(results =>res.redirect('/domiciles'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    })
};

// Function that allow to search domicle.
exports.search = (req,res,next)=>{
    let d = req.query.d;// req.body is an object
    
    modelDomicile.find({d}).exec()
    .then(domiciles=>{
        let results = [];
        if(d){
            domiciles.forEach(domicile=>{
                if(domicile.title.toLowerCase().includes(d.toLowerCase()) 
                    || domicile.type.toLowerCase().includes(d.toLowerCase())
                    || domicile.address.toLowerCase().includes(d.toLowerCase()) 
                    || domicile.payment.toLowerCase().includes(d.toLowerCase())
                    || domicile.bed.toString().includes(d) 
                    || domicile.bath.toString().includes(d))
                    {
                        results.push(domicile);
                    }
            })
        }
        res.render('./domicile/searchDomicile',{domiciles, results, d, searched:true});
    })
    .catch(err=>next(err));
}

// Function that show detail book
exports.show = (req,res, next)=>{
    let id = req.params.id;
    
    modelDomicile.findById(id).populate('user','firstName lastName').lean()// Promise
    .then(domicile=>{
        if(domicile){
            domicile.createdAt = DateTime.fromJSDate(domicile.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
            return res.render('./domicile/show',{id, domicile});
        }else{
            //Error handler
            let err = new Error('Cannot find a domicile with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

// Function that allow to edit post
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    
    modelDomicile.findById(id)
    .then(domicile => {
        if(domicile){
            res.render('./domicile/edit', {domicile})
        } else {
            let err = new Error('Cannot find a domicle with id ' + id)
            err.status = 404;
            next(err);
        }
    })    
    .catch(err => next(err));
};

// Function that update new post
exports.update = (req,res, next)=>{
    let domicile = req.body;
    let id = req.params.id;
    
    if(req.files && req.files.length > 0){
        domicile.image = domicile.image || [];
        req.files.forEach(file=>{
            domicile.image.push({
                data: file.buffer,
                contentType: file.mimetype,
            });
        });
    }

    modelDomicile.findByIdAndUpdate(id, domicile,{useFindAndModify: false, runValidators:true})
    .then(result =>{
        if(result){
            res.redirect('/domiciles/' + id);
        }else{
            let err = new Error('Cannot find a domicile with id ' + id);
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

    modelBook.findByIdAndDelete(id, {useFindAndModify: false})
    .then(domicile => {
        return res.redirect('/users/myPosts');
    })
    .catch(err=>next(err));
};

