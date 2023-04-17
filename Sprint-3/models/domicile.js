const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const domicileSchema = new Schema({
    user : {type:Schema.Types.ObjectId, ref: 'User'},
    title:{type: String, required:[true, 'title is required']},
    address:{type:String, required:[true,'address is required']},
    description: {type: String, required:[true, 'description is required'], 
        minLength: [10, 'description should have at least 10 character']},
    type:{type: String, required:[true,'type is required']},
    bed:{type: Number, required:[true,'bed is required']},
    bath:{type:Number, required:[true,'bath is required']},
    payment: {type: String, required:[true, 'payment is required'], 
        minLength: [1, 'payment should not be 0']},
    phone:{type:String},
    email:{type: String},
    image: {data: Buffer, contentType: String},
}, {timestamps:true});

// address:  street, city, state, zipcode
// 1234 Candy Rush, Charlotte
// 1st case: same number and street, different city

module.exports = mongoose.model('Domicile', domicileSchema);