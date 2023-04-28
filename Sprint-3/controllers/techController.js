const modelTech = require('../models/tech');
const modelCart = require('../models/cart');
const {DateTime} = require("luxon");

// Function that find all techs
exports.index = (req, res, next)=>{
    const filterByPrice = req.query.price;
    const filterByDevice = req.query.device;
    let results = [];
    // Create an object with key-value pair for filter
    const filterOptions ={
        '1-100' : tech=>tech.price >=1 && tech.price <= 100,
        '100-300' : tech=>tech.price > 100 && tech.price <= 300,
        '300-600' : tech=>tech.price > 300 && tech.price <= 600,
        '600+' : tech=>tech.price > 600,
        'laptop': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
        'smartphone': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
        'tablet': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
        'headphone': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
        'speaker': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
        'printer': tech=>tech.device.toLowerCase().includes(filterByDevice.toLowerCase()),
    }

    modelTech.find()
    .then(techs =>{
        // Create array of functions 
        let filterFunctions = [];
        // If filterByPrice is exist, push all the functions that match the query into the array
        if(filterByPrice && filterOptions[filterByPrice]){
            filterFunctions.push(filterOptions[filterByPrice]);
        }
        // If filterByDevice is exist, push all the functions that match the query into the array
        if(filterByDevice && filterOptions[filterByDevice]){
            filterFunctions.push(filterOptions[filterByDevice]);
        }
        
        if(filterFunctions.length > 0){
            results = techs.filter(tech=>filterFunctions.every(filterForCheck=>filterForCheck(tech)));
        }


        // // Filter by Price and Device
        // if((filterByPrice && filterOptions[filterByPrice]) && (filterByDevice && filterOptions[filterByDevice])){
        //     results = techs.filter(filterOptions[filterByPrice]).filter(filterOptions[filterByDevice]);
        // }else if(filterByDevice && filterOptions[filterByDevice]){
        //     //Filter by Device
        //     results = techs.filter(filterOptions[filterByDevice]);
        // }else if(filterByPrice && filterOptions[filterByPrice]){
        //     //Filter by Price
        //     results = techs.filter(filterOptions[filterByPrice]);
        // }
        res.render('./tech/techs',{techs, results, filterByPrice, filterByDevice});
    })
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
    .then(result =>
        {   req.flash('success', "Successfully post a new book item!");
            res.redirect('/techs')})
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
    .then(tech => {
        //delete from cart collection
        modelCart.deleteMany({techId: id})
        .then(()=> {return res.redirect('/users/myPosts');})
        .catch(err => {
            if(err.name == 'ValidationError'){
                err.status = 400;
            }
            next(err)}
        );    
    
    })
    .catch(err=>next(err));
};
