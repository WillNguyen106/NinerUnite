const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: [true, 'title is required']},
    condition: {type: String, required: [true, 'condition is required'], 
              minLength: [3, 'the condition should have at least 3 character']},
    ispn: {type: String, required: [true, 'ispn is required'], 
              minLength: [3, 'the ispn should have at least 3 character']},
    author : {type:Schema.Types.ObjectId, ref: 'User'},
}, {timestamps:true});



module.exports = mongoose.model('Books', bookSchema);









/*

// Function that exports all the book in the array
exports.find = () => books;

// Funtion that exports book find by ID
exports.findById = (id) => books.find(book =>book.id === id);

// Function allow to add new book to the array
exports.save = function(book){
    book.id = uuidv4();
    book.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    books.push(book);
}

// Function allow to update by ID
exports.updateById = function(id, newBook){
    let book = books.find(book =>book.id === id);
    if(book){
        book.title = newBook.title;
        book.content = newBook.content;
        return true;
    }else{
        return false;
    }
}

// Function allow to delete a story by id
exports.deleteById =  function(id){
    let index = books.findIndex(book => book.id === id);
    if(index !== -1){
        books.splice(index, 1);
        return true;
    }else{
        return false;
    }
}
*/

// exports.search = function(search){
//     let results = [];
//     if(search){
//         let id = books.filter((book)=>book.id ===search);
//         let author = books.filter(book=>book.author.toLowerCase().includes(search.toLowerCase()));
//         let title = books.filter(book=>book.title.toLowerCase().includes(search.toLowerCase()));
//         if(id.length > 0){
//             console.log(id);
//             return id;
//         }

//         if(author.length > 0){
//             console.log(author);
//             return author;
//         }

//         if(title.length > 0){
//             console.log(title);
//             return title;
//         }
//     }
//     return results;
// }