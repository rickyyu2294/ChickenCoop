const express = require('express');
const multer = require('multer');
const coops = require('../controllers/coops');
const catchAsync = require("../utils/CatchAsync");
const {isLoggedIn, userIsCoopOwner, validateCoop} = require("../utils/middleware");
const router = express.Router();

const upload = multer({dest: 'uploads/' });

router.route('/')
    .get(catchAsync(coops.index))
    .post(upload.single('image'), (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.redirect("/coops");
    });
    //.post(isLoggedIn, validateCoop, catchAsync(coops.new));

router.get('/new', isLoggedIn, catchAsync(coops.newForm));

router.get('/:id/edit', isLoggedIn, userIsCoopOwner, catchAsync(coops.editForm));

router.route('/:id')
    .get(catchAsync(coops.show))
    .put(isLoggedIn, userIsCoopOwner, validateCoop, catchAsync(coops.edit))
    .delete(isLoggedIn, userIsCoopOwner, catchAsync(coops.delete));

module.exports = router;