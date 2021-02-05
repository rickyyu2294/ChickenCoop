const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChickenSchema = new Schema({
    name: String,
    image: String,
    description: String,
    hatchDate: Date,
    gender: String
});

module.exports = mongoose.model('Chicken', ChickenSchema);

