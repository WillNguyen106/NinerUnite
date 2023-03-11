const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, ref: 'User'},
    itemId : {type: String, required: [true, 'itemId is required']}
}, {timestamps:true});



module.exports = mongoose.model('Cart', cartSchema);