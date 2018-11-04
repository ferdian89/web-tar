const User = require('../models/user');
const passport = require('passport')


exports.signup_get = (req, res, next) => {
    res.render('authentication/signup');
}


exports.signup_post = passport.authenticate('local.signup', {
  successRedirect: '/members',
  failureRedirect: '/signup',
  failureFlash: true
});
