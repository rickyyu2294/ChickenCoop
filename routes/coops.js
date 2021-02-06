const express = require('express');
const Coop = require('../models/coop')
const Chicken = require('../models/chicken')
const router = express.Router();

// Index
router.get('/', async (req, res) => {
    const coops = await Coop.find();
    res.render('coops/index', {
        coops
    });
});

// New
router.get('/new', async (req, res) => {
    res.render('/new');
});

router.post('/', async (req, res) => {
    const coop = new Coop(req.body.coop);
    await coop.save();

    res.redirect(`/coops/${coop._id}`);
});

// Show
router.get('/:id', async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    res.render('coops/show', {
        coop
    });
});

// Edit
router.get('/:id/edit', async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    res.render('coops/edit', {
        coop
    });
});

router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const coop = await Coop.findByIdAndUpdate(id, {
        ...req.body.coop
    });
    res.redirect(`/coops/${coop._id}`);
});

// Delete
router.delete('/:id/delete', async (req, res) => {
    const {
        id
    } = req.params;
    await Coop.findByIdAndDelete(id);

    res.redirect('/coops');
});

module.exports = router;