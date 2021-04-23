const express = require('express');
const users = require('../controllers/users');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");
const passport = require('passport');

// User registration
router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.register));

// Login
router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/users/login'}), users.login);

// Logout
router.get('/logout', users.logout);

module.exports = router;