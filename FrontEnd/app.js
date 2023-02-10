/*
Initialize Framework
 1. Express: Fast, unopinionated, minimalist web framework for Node.js.
 2. Morgan: HTTP request logger middleware for node.js
 3. Method-Override: Handle PUT and DELETE request
*/
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

/*
Initialize routes
 1. domicile
 2. tech produtcs
 3. textbook
*/
const domicile = require('./routes/domicileRoutes');
const techProducts = require('./routes/techproductsRoutes');
const textbook = require('./routes/textbookRoutes');

// Create app
const app = express();

// Configure app
let port = 8084;
let host = 'localhost';

// Initialize template engine
app.set('view engine','ejs');

// Mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Set up routes
app.get('/',(req,res)=>{
    res.render('landing');
});






// Start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port);
});

