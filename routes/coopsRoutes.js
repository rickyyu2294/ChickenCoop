const express = require('express');
const Coop = require('../models/coopModel')
const Chicken = require('../models/chickenModel')
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");

// Index
router.get('/', catchAsync(async (req, res) => {
    const coops = await Coop.find();
    res.render('coops/index', {
        coops
    });
}));

// New
router.get('/new', catchAsync(async (req, res) => {
    res.render('coops/new');
}));

router.post('/', catchAsync(async (req, res) => {
    const coop = new Coop(req.body.coop);
    await coop.save();

    res.redirect(`/coops/${coop._id}`);
}));

// Show
router.get('/:id', catchAsync(async (req, res, next) => {
    const coop = await Coop.findById(req.params.id);
    res.render('coops/show', {
        coop
    });
}));

// Edit
router.get('/:id/edit', catchAsync(async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    res.render('coops/edit', {
        coop
    });
}));

router.put('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Coop.findByIdAndUpdate(id, {
        ...req.body.coop
    })
    .then(coop => res.redirect(`/coops/${coop._id}`));
}));

// Delete
router.delete('/:id/delete', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    await Coop.findByIdAndDelete(id);

    res.redirect('/coops');
}));

module.exports = router;