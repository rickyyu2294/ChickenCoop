const Coop = require('../models/coopModel')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to continue.');
        return res.redirect('/users/login');
    }
    next();
}

module.exports.userIsOwner = async (req, res, next) => {
    const {id} = req.params;
    const coop = await Coop.findById(id);
    if (!coop.owner.equals(req.user._id)) {
        req.flash('error', 'You are not the owner of this coop.');
        return res.redirect(`/coops/${coop._id}`);
    }

    next();
}