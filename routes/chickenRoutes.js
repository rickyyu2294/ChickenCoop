const express = require('express');
const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, validateChicken} = require("../utils/middleware");
const Coop = require('../models/coopModel')
const Chicken = require('../models/chickenModel')
const {chickenSchema} = require('../schemas.js');

// Add
router.post('/', isLoggedIn, validateChicken, catchAsync(async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    const chicken = new Chicken(req.body.chicken);

    coop.chickens.push(chicken);
    await chicken.save();
    await coop.save();
    req.flash('success', 'Successfully added chicken to coop');
    res.redirect(`/coops/${coop._id}`);
}));

// Delete
router.delete('/:chickenid/', isLoggedIn, catchAsync(async (req, res) => {
    const {id, chickenid} = req.params;
    console.log(id);
    await Coop.findByIdAndUpdate(id, {$pull: {chickens: chickenid}});
    await Chicken.findByIdAndDelete(chickenid);
    req.flash('success', 'Successfully removed chicken from coop');
    res.redirect(`/coops/${id}`);
}));

module.exports = router;