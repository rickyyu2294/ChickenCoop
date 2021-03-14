const mongoose = require('mongoose');
const Chicken = require('./chickenModel');
const User = require('./userModel');
const Schema = mongoose.Schema;

const CoopSchema = new Schema({
    name: String,
    image: String,
    description: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    chickens: [{type: Schema.Types.ObjectId, ref: 'Chicken'}]
});

CoopSchema.post('findOneAndDelete', async (coop) => {
    if (coop) {
        await Chicken.deleteMany({
            _id: {
                $in: coop.chickens
            }
        })
    }
});

module.exports = mongoose.model('Coop', CoopSchema);