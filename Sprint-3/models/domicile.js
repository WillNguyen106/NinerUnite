const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const domicileSchema = new Schema({
    user : {type:Schema.Types.ObjectId, ref: 'User'},
    price: {type: Number, required: [true, 'price is required'], 
            minLength: [1, 'price should not be 0']},
    title:{type: String, required: [true, 'title is required']},
    description: {type: String, required: [true, 'description is required'], 
            minLength: [10, 'description should have at least 10 character']},
    type:{type: String, required:[true,'type is required']},
    bed:{type: Number, required:[true,'bed is required']},
    bath:{type:Number, required:[true,'bath is required']},
    location:{type:String, required:[true,'location is required']},
    phone:{type:String},
    email:{type: String},
    image: {data: Buffer, contentType: String},
}, {timestamps:true});



module.exports = mongoose.model('Domicile', domicileSchema);