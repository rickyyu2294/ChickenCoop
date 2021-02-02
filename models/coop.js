const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoopSchema = new Schema({
    name: String,
    description: String,
});

module.exports = mongoose.Model('Coop', CoopSchema);