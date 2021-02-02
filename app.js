;const express = require('express')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Coop = require("./models/coop");
const ejsMate = require('ejs-mate');

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

// Routes /////////////////////////

app.get('/', function (req, res) {
  res.render('home');
})

// Index
app.get('/coops', async (req, res) => {
  const coops = await Coop.find();
  res.render('coops/index', {coops});
});

// New
app.get('/coops/new', async (req, res) => {
  res.render('coops/new');
});

app.post('/coops', async (req, res) => {
  const coop = new Coop(req.body.coop);
  await coop.save();

  res.redirect(`/coops/${coop._id}`);
});

// Show
app.get('/coops/:id', async (req, res) => {
  const coop = await Coop.findById(req.params.id);
  res.render('coops/show', {coop});
});

// Edit
app.get('/coops/:id/edit', async (req, res) => {
  const coop = await Coop.findById(req.params.id);
  res.render('coops/edit', {coop});
});

app.put('/coops/:id', async (req, res) => {
  const {id} = req.params;
  const coop = await Coop.findByIdAndUpdate(id, {...req.body.coop});
  res.redirect(`/coops/${coop._id}`);
});

// Delete
app.delete('/coops/:id/delete', async (req, res) => {
  const {id} = req.params;
  await Coop.findByIdAndDelete(id);

  res.redirect('/coops');
});
 
// Start Server /////////////////////////

app.listen(3000, () => {
    console.log("Listening on port 3000");
})