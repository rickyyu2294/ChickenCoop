const mongoose = require('mongoose');
const Coop = require("../models/coop")

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

const seedDB = async() => {
    await Coop.deleteMany({});
    const c = new Coop({
        name: 'Moo',
        description: 'moomoo'
    });
    await c.save();
}

seedDB();