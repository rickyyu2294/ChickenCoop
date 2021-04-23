const User = require('../models/userModel');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
};

module.exports.register = async(req, res, next) => {
    const {email, username, password} = req.body;
    const user = new User({
        email, 
        username
    });
    try {
        const registeredUser = await User.register(user, password);
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
};

module.exports.loginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/coops';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "You have logged out.");
    res.redirect('/');
};