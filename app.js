const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Coop = require("./models/coopModel");
const catchAsync = require("./utils/CatchAsync");
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const CoopRoutes = require('./routes/coopsRoutes.js');
const ChickenRoutes = require('./routes/chickenRoutes.js')
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/chicken-coop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true}));
app.use(flash());

const WEEK_MILISECONDS = 1000 * 60 * 60 * 24 * 7;
const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave:false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + WEEK_MILISECONDS,
    maxAge: WEEK_MILISECONDS
  }
};
app.use(session(sessionConfig));

// Middleware

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes 

app.get('/', function (req, res) {
  res.render('home');
})

app.use('/coops', CoopRoutes);
app.use('/coops/:id/chickens', ChickenRoutes);

// Error handler

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const {statusCode = 500, message = 'Something Went Wrong'} = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render('error', {err});
});
 
// Start Server

app.listen(3000, () => {
    console.log("Listening on port 3000");
})