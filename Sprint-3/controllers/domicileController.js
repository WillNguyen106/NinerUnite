const domicile = require("../models/domicile");
const modelDomicile = require("../models/domicile");
const {DateTime} = require("luxon");

// Function that find all domiciles
exports.index = (req,res,next)=>{
    const filterByPayment = req.query.price;
    const filterByType = req.query.type;
    const filterByBed = req.query.bed;
    const filterByBath = req.query.bath;
    const filterByBedKey = filterByBed + 'bed';
    const filterByBathKey = filterByBath + 'bath';
    let results = [];
    
    // Create an object with key-value pair for filter
    const filterOptions ={
        //Key: queries
        // Value: function of different value of query
        '400-600' : domicile=>domicile.payment >= 400 && domicile.payment <= 600,
        '1000-1500': domicile=>domicile.payment > 1000 && domicile.payment <= 1500,
        '1500+' : domicile=>domicile.payment > 1500,
        'dorm': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        'apartment': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        'townhouse': domicile=>domicile.type.toLowerCase().includes(filterByType.toLowerCase()),
        '1bed': domicile=>domicile.bed == 1,
        '2bed': domicile=>domicile.bed == 2,
        '3bed': domicile=>domicile.bed == 3,
        '4bed': domicile=>domicile.bed == 4,
        '1bath': domicile=>parseFloat(domicile.bath) === 1,
        '1.5bath': domicile=>parseFloat(domicile.bath) === 1.5,
        '2bath': domicile=>parseFloat(domicile.bath) === 2,
        '2.5bath': domicile=>parseFloat(domicile.bath) === 2.5,
        '3bath': domicile=>parseFloat(domicile.bath) === 3,
    }
    modelDomicile.find()
    .then(domiciles=>{
        const filterFunctions = [];
        if(filterByPayment && filterOptions[filterByPayment]){
            filterFunctions.push(filterOptions[filterByPayment]);
        }

        if(filterByType && filterOptions[filterByType]){
            filterFunctions.push(filterOptions[filterByType]);
        }
        
        if(filterByBedKey && filterOptions[filterByBedKey]){
            filterFunctions.push(filterOptions[filterByBedKey]);
        }
        
        if(filterByBathKey && filterOptions[filterByBathKey]){
            filterFunctions.push(filterOptions[filterByBathKey]);
        }

        if (filterFunctions.length > 0) {
            const domicileLists = domiciles.filter(domicile => filterFunctions.every(filterForCheck => filterForCheck(domicile)));
            // Sort the results in order of price
            results = domicileLists.sort((domicile1, domicile2)=>domicile1.payment-domicile2.payment);
        }

        // Mutiple combination filter options that we can not use if/else statement
        // Some conditions are confused to each other if we do not distinct and set it correctly
        // Undefined is still a value but it has not been assigned any valid value yet
        // The function still receive the undefined value but will throw exception
        // We have to make sure the filter query and the function that take its query are not undefine. 
        
        res.render('./domicile/domiciles',{
            domiciles: domiciles,
            results: results,
            filterByPayment: filterByPayment,
            filterByType: filterByType,
            filterByBed: filterByBed,
            filterByBath: filterByBath,
        });
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
                    || domicile.payment.toString().includes(d)
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
            console.log(domicile.type);
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

    modelDomicile.findByIdAndDelete(id, {useFindAndModify: false})
    .then(domicile => {
        return res.redirect('/users/myPosts');
    })
    .catch(err=>next(err));
};

