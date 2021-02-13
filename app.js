const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Coop = require("./models/coopModel");
const catchAsync = require("./utils/CatchAsync");
const ejsMate = require('ejs-mate');
const CoopRoutes = require('./routes/coopsRoutes.js');

mongoose.connect('mongodb://localhost:27017/chicken-coop', {
  useNewUrlParse: true,
  useCreateIndex: true,
  useUnifiedParser: true
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
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true}));

// Routes 

app.get('/', function (req, res) {
  res.render('home');
})

app.use('/coops', CoopRoutes);

// Error handler

app.use((err, req, res, next) => {
  res.send('Something went wrong!');
});
 
// Start Server

app.listen(3000, () => {
    console.log("Listening on port 3000");
})