const express = require('express');
const chickens = require('../controllers/chickens')
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, validateChicken, userIsChickenOwner} = require("../utils/middleware");

// Add
router.post('/', isLoggedIn, validateChicken, catchAsync(chickens.new));

// Delete
router.delete('/:chickenid/', isLoggedIn, userIsChickenOwner, catchAsync(chickens.delete));

module.exports = router;