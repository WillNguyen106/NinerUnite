const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate',false);
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user : {type:Schema.Types.ObjectId, ref: 'User'},
    title:{type: String, required: [true, 'title is required']},
    condition: {type: String, required: [true, 'condition is required'], 
            minLength: [3, 'condition should have at least 3 character']},
    isbn: {type: String, required: [true, 'ispn is required'], 
            minLength: [3, 'ispn should have at least 3 character']},
    author : {type: String, required: [true, 'Author is required'], 
            minLength: [3, 'author should have at least 8 character']},
    price: {type: Number, required: [true, 'price is required'], 
            minLength: [1, 'price should not be 0']},
    image: {data: Buffer, contentType: String}  
}, {timestamps:true});



module.exports = mongoose.model('Book', bookSchema);