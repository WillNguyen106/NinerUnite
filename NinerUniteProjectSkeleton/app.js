//require module
const express = require('express');
const morgan = require('morgan');//for log activities
const methodOverride = require('method-override');// for update and delete
const mongoose = require('mongoose');//for mongoose DB
const connectRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create an app
const app = express();

//configure the app
const port = '3003';
const host = 'localhost';
let url = 'mongodb://localhost:27017/NinerUnite';//for NBAD DB in mongoose
app.set('view engine', 'ejs');

//connect to DB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    //start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    })
})
.catch(err => console.log(err.message));

//mounth the middleware function
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))//log all request and response 
app.use(methodOverride('_method'));

app.use(session({
    secret: 'Team13Secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},//set lifetime for the cookie 
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'})
}));

app.use(flash());// user temperary flash message after session

app.use((req, res, next) => {
    
    //console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
})

app.use('/', mainRoutes);

app.use('/connections', connectRoutes);

app.use('/users', userRoutes);

//for all error happend to the app
app.use((req, res, next) => {
    let err = new Error('The server cannot locate the request URL: ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error',{error: err});
    
}); 
