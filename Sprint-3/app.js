/*
Initialize Framework
 1. Express: Fast, unopinionated, minimalist web framework for Node.js.
 2. Morgan: HTTP request logger middleware for node.js
 3. Method-Override: Handle PUT and DELETE request
*/
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');


/* Initialize for user login and sign up tasks
*/
const mongoose = require('mongoose');//for mongoose DB
const session = require('express-session');// for holding session information during accessing the website
const MongoStore = require('connect-mongo');// for holding the indformation and success as well as failure messages
const flash = require('connect-flash');// for display, storing those messages

/*
Initialize routes
 1. domicile
 2. tech produtcs
 3. textbook
*/
const domicileRoutes = require('./routes/domicileRoutes');
const techRoutes = require('./routes/techRoutes');
const textbookRoutes = require('./routes/bookRoutes');
const mainRoutes = require('./routes/mainRoutes');//for main routes to the landing page
const userRoutes = require('./routes/userRoutes');//for user routes to login, sign up pages
const cartRoutes = require('./routes/cartRoutes');//for cart routes to the cart of items
// Create app
const app = express();


// Configure app
let port = 8084;
let host = 'localhost';
let url = 'mongodb+srv://willnguyen123:demo123@cluster0.n3clj8n.mongodb.net/NinerUnite?retryWrites=true&w=majority';//for NinerUnite DB in mongoose

// Initialize template engine
app.set('view engine','ejs');

//connect to DB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    //start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    })
})
.catch(err => console.log(err.message));

// Mount middleware
app.use(express.static(path.join(__dirname,'public')));// for access files stored in public folder inclusing css and images
// app.use(express.static('images'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));// for catching time and method when routing to a specific page
app.use(methodOverride('_method'));// for updating and deletting selected model that being created in the each models

//initailiza the session collection
app.use(session({
    secret: 'NinerUniteTeam',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},//set lifetime for the cookie 
    store: new MongoStore({mongoUrl: 'mongodb+srv://willnguyen123:demo123@cluster0.n3clj8n.mongodb.net/NinerUnite?retryWrites=true&w=majority'})
}));

app.use(flash());// user temperary flash message after session

//store the user session infor in the local storage
app.use((req, res, next) => {
    //req.session.user has the following:
    /*
        {
        id: 'the userID',
        firstName: 'firstName',
        lastName: 'lastName'
        }
    */
    res.locals.user = req.session.user || null;
    // console.log(req.session);
    // every messages created by programmer are store in 2 arrray successMessages and erroMessages
    res.locals.successMessages = req.flash('success'); 
    res.locals.errorMessages = req.flash('error');
    next();
})


// Handler for the landing page path
app.use('/', mainRoutes);
// Handler for the textbook products path
app.use('/books', textbookRoutes);
// Handler for the all user path including login and signup
app.use('/users', userRoutes);
// Handler for the cart path
app.use('/cart', cartRoutes);
// Handler for the tech products path
app.use('/techs',techRoutes);
// Handler for the domicle products path
app.use('/domiciles',domicileRoutes);


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