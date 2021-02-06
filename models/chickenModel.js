const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChickenSchema = new Schema({
    name: String,
    image: String,
    description: String,
    gender: String,
    birthdate: Date
});

module.exports = mongoose.model('Chicken', ChickenSchema);