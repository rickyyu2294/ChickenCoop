const express = require('express')
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Coop = require("./models/coop")

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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes /////////////////////////

app.get('/', function (req, res) {
  res.render('home');
})

app.get('/coops', async (req, res) => {
  const coops = await Coop.find();
  res.render('coops/index');
});
 
// Start Server /////////////////////////

app.listen(3000, () => {
    console.log("Listening on port 3000");
})