const express = require('express');
const coops = require('../controllers/coops')
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, userIsCoopOwner, validateCoop} = require("../utils/middleware");

const router = express.Router();

// Index
router.get('/', catchAsync(coops.index));

// New
router.get('/new', isLoggedIn, catchAsync(coops.newForm));

router.post('/', isLoggedIn, validateCoop, catchAsync(coops.new));

// Show
router.get('/:id', catchAsync(coops.show));

// Edit
router.get('/:id/edit', isLoggedIn, userIsCoopOwner, catchAsync(coops.editForm));

router.put('/:id', isLoggedIn, userIsCoopOwner, validateCoop, catchAsync(coops.edit));

// Delete
router.delete('/:id/delete', isLoggedIn, userIsCoopOwner, catchAsync(coops.delete));

module.exports = router;