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
//const domicileRoutes = require('./routes/domicileRoutes');
//const techProductsRoutes = require('./routes/techProductsRoutes');
const textbookRoutes = require('./routes/bookRoutes');

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
    res.render('index');
});

// Handler for the products path
app.use('/books', textbookRoutes);
//app.use('/techProducts',techProductsRoutes);
//app.use('/domiciles', domicileRoutes);

app.use((req,res,next)=>{
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

// Error handler
app.use((err,req,res,next)=>{
    console.log(err.stack); //See the error on the server view
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error',{error:err});
});



// Start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port);
});

