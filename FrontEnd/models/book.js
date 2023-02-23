// Get Date and Time package
const {DateTime} = require("luxon");

// Unique ID package
const {v4: uuidv4} = require('uuid');
const books = [
    {
        id: '1',
        title:'Computer Architecture',
        content:'I would like to sell this book to anyone who want to learn computer hardware or going to take this class next semester',
        condition: 'like new, 98%',
        author:'Will Nguyen',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'2',
        title:'Software engineer',
        content:'Want to be a good software engineer, buy this one',
        condition: 'good looking, 97%',
        author:'Robin Kunde',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'3',
        title:'Network Based Web App Development',
        content:'Love this book',
        condition:'100%, bought but not use it',
        author:'John Mendes',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
    
];

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

exports.search = function(search){
    let results = books;
    /*
    if option === id return books. filter by id
    else if option  === author return books. filter by id
    */

    if(search){
        let id = books.filter((book)=>book.id ===search);
        let author = books.filter(book=>book.author.toLowerCase().includes(search.toLowerCase()));
        let title = books.filter(book=>book.title.toLowerCase().includes(search.toLowerCase()));
        if(id.length > 0){
            console.log(id);
            return id;
        }

        if(author.length > 0){
            console.log(author);
            return author;
        }

        if(title.length > 0){
            console.log(title);
            return title;
        }
    }

    
    return results;
}