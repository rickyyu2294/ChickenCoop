const express = require('express');
const Coop = require('../models/coopModel')
const Chicken = require('../models/chickenModel')
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, userIsCoopOwner, validateCoop} = require("../utils/middleware");
const Joi = require("joi");

const router = express.Router();

// Index
router.get('/', catchAsync(async (req, res) => {
    const coops = await Coop.find();
    res.render('coops/index', {
        coops
    });
}));

// New
router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    res.render('coops/new');
}));

router.post('/', isLoggedIn, validateCoop, catchAsync(async (req, res) => {
    // Create and save new coop
    const coop = new Coop(req.body.coop);
    coop.owner = req.user._id;
    console.log(coop);
    await coop.save();
    req.flash('success', 'Successfully created new coop');

    res.redirect(`/coops/${coop._id}`);
}));

// Show
router.get('/:id', catchAsync(async (req, res, next) => {
    const coop = await Coop.findById(req.params.id).populate('chickens').populate('owner');
    if (!coop) {
        req.flash('error', 'Coop could not be found');
        res.redirect('/coops');
        return;
    }
    res.render('coops/show', {
        coop
    });
}));

// Edit
router.get('/:id/edit', isLoggedIn, userIsCoopOwner, catchAsync(async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    if (!coop) {
        req.flash('error', 'Coop could not be found');
        res.redirect('/coops');
        return;
    }

    res.render('coops/edit', {
        coop
    });
}));

router.put('/:id', isLoggedIn, userIsCoopOwner, validateCoop, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Coop.findByIdAndUpdate(id, {
        ...req.body.coop
    })
    .then(coop => {
        req.flash('success', 'Successfully updated coop');
        res.redirect(`/coops/${coop._id}`)
    });
}));

// Delete
router.delete('/:id/delete', isLoggedIn, userIsCoopOwner, catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    await Coop.findByIdAndDelete(id);

    res.redirect('/coops');
}));

module.exports = router;