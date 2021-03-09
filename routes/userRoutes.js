const express = require('express');
const Joi = require("joi");
const ExpressError = require('../utils/ExpressError');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");

const User = require('../models/userModel');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/', (req, res) => {
    res.send('new user');
});

module.exports = router;