const express = require('express');
const Coop = require('../models/coopModel')

module.exports.index = async (req, res) => {
    const coops = await Coop.find();
    res.render('coops/index', {
        coops
    });
};

module.exports.newForm = async (req, res) => {
    res.render('coops/new');
};

module.exports.new = async (req, res) => {
    // Create and save new coop
    const coop = new Coop(req.body.coop);
    coop.owner = req.user._id;
    console.log(coop);
    await coop.save();
    req.flash('success', 'Successfully created new coop');

    res.redirect(`/coops/${coop._id}`);
};

module.exports.show = async (req, res, next) => {
    const coop = await Coop.findById(req.params.id).populate('chickens').populate('owner');
    if (!coop) {
        req.flash('error', 'Coop could not be found');
        res.redirect('/coops');
        return;
    }
    res.render('coops/show', {
        coop
    });
};

module.exports.editForm = async (req, res) => {
    const coop = await Coop.findById(req.params.id);
    if (!coop) {
        req.flash('error', 'Coop could not be found');
        res.redirect('/coops');
        return;
    }

    res.render('coops/edit', {
        coop
    });
};

module.exports.edit = async (req, res) => {
    const {id} = req.params;
    await Coop.findByIdAndUpdate(id, {
        ...req.body.coop
    })
    .then(coop => {
        req.flash('success', 'Successfully updated coop');
        res.redirect(`/coops/${coop._id}`)
    });
};

module.exports.delete = async (req, res) => {
    const {
        id
    } = req.params;
    await Coop.findByIdAndDelete(id);

    res.redirect('/coops');
};