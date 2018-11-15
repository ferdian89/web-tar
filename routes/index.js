var express = require('express');
var router = express.Router();
const passport = require('passport');

var member_controller = require('../controllers/memberController');
var Member = require('../models/member');

/* GET home page. */
router.get('/', member_controller.member_list_limit);

/* Get Full Profile */
router.get('/member/myprofile', isLoggedIn, function(req, res, next) {
  Member.find({user: req.user})
  .exec(function (err, list_members) {
          if (err) { return next(err); }
          // Successful, so render.
          res.render('member-profile',  { member_list: list_members });
      });
});

router.get('/member/dashboard', isLoggedIn, function(req, res, next) {
  Member.find({user: req.user})
  .exec(function (err, members) {
          if (err) { return next(err); }
          // Successful, so render.
          res.render('dashboard',  { members: members });
      });
});
/*
router.get('/member/dashboard', isLoggedIn, function(req, res, next) {
  Member.find({user: req.user}).exec(function(err, list_members) {
    if (err) {
      return next(err);
    }
      res.render('dashboard', { member_list: list_members});
  });
});
*/


router.get('/member/dashboard/form', isLoggedIn, function(req, res, next) {
  res.render('profile-form/profile', { title: 'Express' });
});


// GET request to create member.
router.get('/member/data', isLoggedIn, member_controller.member_create_get);

// POST request to create member.
router.post('/member/data', isLoggedIn, member_controller.member_create_post);

// GET request to update member.
router.get('/member/data/edit', isLoggedIn, member_controller.member_update_get);

// POST request to update member.
router.post('/member/data/edit', isLoggedIn, member_controller.member_update_post);

// GET request for one member.
router.get('/member/:id/', isLoggedIn, member_controller.member_detail);

// GET request for list of all Members.
router.get('/member/dashboard', isLoggedIn, member_controller.member_list);



// GET request to create member.
router.get('/member/ibadah', isLoggedIn, member_controller.member_ibadah_create_get);

// POST request to create member.
router.post('/member/ibadah', isLoggedIn, member_controller.member_ibadah_create_post);






module.exports = router;



function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
