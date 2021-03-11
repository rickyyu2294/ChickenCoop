const express = require('express');
const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");

const User = require('../models/userModel');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    const {email, username, password} = req.body.user;
    const user = new User({
        email, 
        username
    });
    try {
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success', 'New Account Created');
        res.redirect('/coops');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/register');
    }
}));

module.exports = router;