const express = require('express');
const coops = require('../controllers/coops');
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, userIsCoopOwner, validateCoop} = require("../utils/middleware");
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage});

router.route('/')
    .get(catchAsync(coops.index))
    .post(isLoggedIn, upload.array('images'), validateCoop, catchAsync(coops.new));

router.get('/new', isLoggedIn, catchAsync(coops.newForm));

router.get('/:id/edit', isLoggedIn, userIsCoopOwner, catchAsync(coops.editForm));

router.route('/:id')
    .get(catchAsync(coops.show))
    .put(isLoggedIn, userIsCoopOwner, upload.array('images'), validateCoop, catchAsync(coops.edit))
    .delete(isLoggedIn, userIsCoopOwner, catchAsync(coops.delete));

module.exports = router;