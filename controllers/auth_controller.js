var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
var Member = require('../models/member');
const csrf = require('csurf');


const csrfProtection = csrf();
router.use(csrfProtection);

//SIGN UP
exports.signup_get = (req, res, next) => {
    var messages = req.flash('error');
    res.render('authentication/signup', { messages: messages, hasErrors: messages.length > 0});
}
exports.signup_post = passport.authenticate('local.signup', {
  successRedirect: '/member/data',
  failureRedirect: '/user/signup',
  failureFlash: true
});

//SIGN IN
exports.signin_get = (req, res, next) => {
    var messages = req.flash('error');
    res.render('authentication/signin', { messages: messages, hasErrors: messages.length > 0});
}
exports.signin_post = passport.authenticate('local.signin', {
  successRedirect: '/member/data',
  failureRedirect: '/user/signin',
  failureFlash: true
});
