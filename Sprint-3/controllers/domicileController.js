const modelDomicile = require("../models/domicile");

// Function that find all domiciles
exports.index = (req,res,next)=>{
    modelDomicile.find()
    .then(domiciles=>res.render('./domicile/domiciles',{domiciles}))
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
    if(req.file){
        domicile.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
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
    
    modelBook.find({d}).exec()
    .then(domiciles=>{
        let results = [];
        if(d){
            let title = domiciles.filter((domicile)=>domicile.title.toLowerCase().includes(d.toLowerCase()));
            let bed = domiciles.filter((domicile)=>domicile.bed.toLowerCase().includes(d.toLowerCase()));
            let bath = domiciles.filter((domicile)=>domicile.bath.toLowerCase().includes(d.toLowerCase()));
            let type = domiciles.filter((domicile)=>domicile.type.toLowerCase().includes(d.toLowerCase()));
            let location = domiciles.filter((domicile)=>domicile.location.toLowerCase().includes(d.toLowerCase()));
            let price = domiciles.filter((domicile)=>domicile.price.includes(d));

            title.forEach(domicile => {
                results.push(domicile);
            });
            
            bed.forEach(domicile => {
                results.push(domicile);
            });
    
            bath.forEach(domicile => {
                results.push(domicile);
            });
            
            type.forEach(domicile => {
                results.push(domicile);
            });
            
            location.forEach(domicile => {
                results.push(domicile);
            });
            
            price.forEach(domicile => {
                results.push(domicile);
            });
            
        }
        res.render('./domicile/searchDomicile',{domiciles, results, searched:true});
    })
    .catch(err=>next(err));
}

// Function that show detail book
exports.show = (req,res, next)=>{
    let id = req.params.id;
    let selectUserId = req.session.user.id;
    let userIdArray = [];

    modelDomicile.findById(id)// Promise
    .then(domicile=>{
        if(domicile){
            userIdArray.push(selectUserId);
            return res.render('./domicile/show',{domicile, users:userIdArray,selectUserId:domicile.user});
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
    
    if(req.file){
        domicile.image = {
            data: req.file.buffer,
            contentType: req.file.minetype,
        }
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
    .then(result => {
        if(result){
            return res.redirect('/domiciles')
        }else{
            let err = new Error('Cannot find a domiciles with id ' + id);
            err.status = 404;
            next(err);
        }
       
    })
    .catch(err=>next(err));
};

