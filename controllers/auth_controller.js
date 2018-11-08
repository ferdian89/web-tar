var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const csrf = require('csurf');

var Member = require('../models/member');
var member_controller = require('../controllers/memberController');


const csrfProtection = csrf();
router.use(csrfProtection);

//SIGN UP
exports.signup_get = (req, res, next) => {
    var messages = req.flash('error');
    res.render('authentication/signup', { messages: messages, hasErrors: messages.length > 0});
}
exports.signup_post = passport.authenticate('local.signup', {
  successRedirect: '/user/signin',
  failureRedirect: '/user/signup',
  failureFlash: true
});

router.get('/member/dashboard', isLoggedIn, member_controller.member_list);
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


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
