const express = require('express');
const users = require('../controllers/users');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");
const passport = require('passport');

// User registration

router.get('/register', users.registerForm);

router.post('/register', catchAsync(users.register));

// Login

router.get('/login', users.loginForm);

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/users/login'}), users.login);

// Logout

router.get('/logout', users.logout);

module.exports = router;