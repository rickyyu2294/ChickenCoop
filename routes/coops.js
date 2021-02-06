const express = require('express');
const Coop = require("../models/coop");
const Chicken = require("../models/chickens");
const router = express.Router();

// Index
router.get('/', async (req, res) => {
    const coops = await Coop.find()
    .then(coops => res.json(coops))
    .catch(err => res.json(err));
});

// Insert
router.post('/', async (req, res) => {
    console.log(req.body);
    const coop = new Coop(req.body.coop);
    await coop.save()
    .then(() => res.json('New Coop Created\n' + coop))
    .catch(err => res.json(err));
});

// Show
router.get('/:id', async (req, res) => {
    const coop = await Coop.findById(req.params.id)
    .then(coop => res.json(coop))
    .catch(err => res.json(err));
});

// Update
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(req.body.name)
    const newCoop = new Coop({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    });
    const coop = await Coop.findByIdAndUpdate(id, newCoop)
    .then(coop => res.json("Coop Updated\n" + coop))
    .catch(err => res.json(err));
});

// Delete
router.delete('/', async (req, res) => {
    await Coop.deleteMany({}).
    then(() => res.json("Deleted all coops"))
    .catch(err => res.json(err));
});

// Delete all
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    await Coop.findByIdAndDelete(id)
    .then(id => res.json("Coop deleted " + id))
    .catch(err => res.json(err));
});



module.exports = router;