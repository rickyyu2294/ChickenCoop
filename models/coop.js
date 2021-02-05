const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoopSchema = new Schema({
    name: String,
    image: String,
    description: String,
    chickens: [{type: Schema.Types.ObjectId, ref: 'Chicken'}]
});

module.exports = mongoose.model('Coop', CoopSchema);