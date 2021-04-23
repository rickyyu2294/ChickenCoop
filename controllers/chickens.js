const express = require('express');
const Coop = require('../models/coopModel')
const Chicken = require('../models/chickenModel')

module.exports.new = async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    const chicken = new Chicken(req.body.chicken);
    chicken.owner = req.user._id;
    coop.chickens.push(chicken);
    await chicken.save();
    await coop.save();
    req.flash('success', 'Successfully added chicken to coop');
    res.redirect(`/coops/${coop._id}`);
};

module.exports.delete = async (req, res) => {
    const {id, chickenid} = req.params;
    await Coop.findByIdAndUpdate(id, {$pull: {chickens: chickenid}});
    await Chicken.findByIdAndDelete(chickenid);
    req.flash('success', 'Successfully removed chicken from coop');
    res.redirect(`/coops/${id}`);
};