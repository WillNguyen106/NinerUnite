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

