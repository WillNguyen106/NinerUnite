const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, ref: 'User'},
    bookId : {type:Schema.Types.ObjectId, ref: 'Book'},
    techId : {type:Schema.Types.ObjectId, ref: 'Tech'},
    category:{type: String, required: [true, 'category is required']},
}, {timestamps:true});



module.exports = mongoose.model('Cart', cartSchema);