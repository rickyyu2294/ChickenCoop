const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const coops = require('./routes/coops')

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
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Routes /////////////////////////

app.get('/', function (req, res) {
  res.render('home.html');
})

app.use('/coops', coops)
 
// Start Server /////////////////////////

app.listen(3000, () => {
    console.log("Listening on port 3000");
})