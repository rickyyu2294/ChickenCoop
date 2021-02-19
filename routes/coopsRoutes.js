const express = require('express');
const Coop = require('../models/coopModel')
const Chicken = require('../models/chickenModel')
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');
const {coopSchema, chickenSchema} = require('../schemas.js');

const validateCoop = (req, res, next) => {
    // Validate coop parameters received from post request
    const {error} = coopSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

const validateChicken = (req, res, next) => {
    const {error} = chickenSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(e => e.message).join(', ');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

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

router.post('/', validateCoop, catchAsync(async (req, res) => {
    // Create and save new coop
    const coop = new Coop(req.body.coop);
    await coop.save();

    res.redirect(`/coops/${coop._id}`);
}));

// Show
router.get('/:id', catchAsync(async (req, res, next) => {
    const coop = await Coop.findById(req.params.id).populate('chickens');
    console.log(coop);
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

router.put('/:id', validateCoop, catchAsync(async (req, res) => {
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

// Chickens

// Add
router.post('/:id/chicken', validateChicken, catchAsync(async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    const chicken = new Chicken(req.body.chicken);

    coop.chickens.push(chicken);
    await chicken.save();
    await coop.save();
    res.redirect(`/coops/${coop._id}`);
}));

module.exports = router;