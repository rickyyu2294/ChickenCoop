const express = require('express');
const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");
const passport = require('passport');

const User = require('../models/userModel');

// User registration

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res, next) => {
    const {email, username, password} = req.body;
    const user = new User({
        email, 
        username
    });
    try {
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'New Account Created');
            res.redirect('/');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/users/register');
    }
}));

// Login

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/users/login'}), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/coops';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

// Logout

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "You have logged out.");
    res.redirect('/');
});

module.exports = router;