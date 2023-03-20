const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const techSchema = new Schema({
    user : {type:Schema.Types.ObjectId, ref: 'User'},
    brand:{type: String, required: [true, 'brand is required']},
    description: {type: String, required: [true, 'description is required'], 
            minLength: [10, 'description should have at least 10 character']},
    condition: {type: String, required: [true, 'condition is required'], 
            minLength: [3, 'condition should have at least 3 character']},
    price: {type: Number, required: [true, 'price is required'], 
            minLength: [1, 'price should not be 0']},
    image: {type: String, path:'/image/techImages/'}  
}, {timestamps:true});



module.exports = mongoose.model('Tech', techSchema);