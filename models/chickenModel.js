const mongoose = require('mongoose');
const User = require('./userModel');

const Schema = mongoose.Schema;

const ChickenSchema = new Schema({
    name: String,
    image: String,
    description: String,
    gender: String,
    birthdate: Date,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Chicken', ChickenSchema);