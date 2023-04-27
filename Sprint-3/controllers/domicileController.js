const domicile = require("../models/domicile");
const modelDomicile = require("../models/domicile");
const {DateTime} = require("luxon");

// Function that find all domiciles
exports.index = (req,res,next)=>{
    const filterByPayment = req.query.price;
    const filterByType = req.query.type;
    // Distinct between key of bed and bath.
    //Bed
    let queryBed = req.query.bed;
    const filterByBed = queryBed + "bed";
    //Bath
    let queryBath = req.query.bath;
    const filterByBath = queryBath + "bath";
    let results = [];
    // Create Map for filter
    const filterOptions ={
        '400-600' : domicile=>domicile.payment >=400 && domicile.payment <= 600,
        '1000-1500': domicile=>domicile.payment > 1000 && domicile.payment <= 1500,
        '2000+' : domicile=>domicile.payment > 2000,
        'dorm': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        'apartment': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        'townhouse': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        '1bed': domicile=>parseFloat(domicile.bed) == 1,
        '2bed': domicile=>parseFloat(domicile.bed) == 2,
        '3bed': domicile=>parseFloat(domicile.bed) == 3,
        '4bed': domicile=>parseFloat(domicile.bed) == 4,
        '1bath': domicile=>parseFloat(domicile.bath) == 1,
        '1.5bath': domicile=>parseFloat(domicile.bath) == 1.5,
        '2bath': domicile=>parseFloat(domicile.bath) == 2,
        '2.5bath': domicile=>parseFloat(domicile.bath) == 2.5,
        '3bath': domicile=>parseFloat(domicile.bath) == 3,
    }
    modelDomicile.find()
    .then(domiciles=>{
        if(filterByPayment && filterByType && filterByBed && filterByBath){
            // Filter by Payment and Type and Bed and Bath
            results = domiciles.filter(filterOptions[filterByPayment])
                                .filter(filterOptions[filterByType])
                                .filter(filterOptions[filterByBed])
                                .filter(filterOptions[filterByBath]);                     
        }else if((filterByPayment && filterOptions[filterByPayment])){
            // Filter by Payment
            results = domiciles.filter(filterOptions[filterByPayment]);
        }else if(filterByType && filterOptions[filterByType]){
            // Filter by Type
            results = domiciles.filter(filterOptions[filterByType]);
        }else if(filterByBed && filterOptions[filterByBed]){
            // Filter by Bed
            results = domiciles.filter(filterOptions[filterByBed]);
        }else if(filterByBath && filterOptions[filterByBath]){
            // Filter by Bath
            results = domiciles.filter(filterOptions[filterByBath]);
        }

        
        res.render('./domicile/domiciles',{domiciles,results,filterByBath,filterByBed,filterByPayment,filterByType});
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
            console.log(typeof(domicile.bed));
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

