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
      })
});



router.get('/member/dashboard', isLoggedIn, function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});


router.get('/member/dashboard/form', isLoggedIn, function(req, res, next) {
  res.render('profile-form/profile', { title: 'Express' });
});


// GET request to create member.
router.get('/member/data', isLoggedIn, member_controller.member_create_get);

// POST request to create member.
router.post('/member/data', isLoggedIn, member_controller.member_create_post);

// GET request to update member.
router.get('/member/:id/update', isLoggedIn, member_controller.member_update_get);

// POST request to update member.
router.post('/member/:id/update', isLoggedIn, member_controller.member_update_post);

// GET request for one member.
router.get('/member/:id/', isLoggedIn, member_controller.member_detail);

// GET request for list of all Members.
router.get('/member/dashboard', isLoggedIn, member_controller.member_list);











//router.get('/profile/pendidikan', member_controller.member_create_get_pend);
//router.post('/profile/pendidikan', member_controller.member_create_post_pend);


router.get('/profile/pendidikan', function(req, res, next) {
  res.render('profile-form/pendidikan', { title: 'Express' });
});

router.get('/profile/ibadah', function(req, res, next) {
  res.render('profile-form/ibadah', { title: 'Express' });
});

router.get('/profile/prestasi', function(req, res, next) {
  res.render('profile-form/prestasi', { title: 'Express' });
});

router.get('/profile/Organisasi', function(req, res, next) {
  res.render('profile-form/Organisasi', { title: 'Express' });
});

router.get('/profile/keluarga', function(req, res, next) {
  res.render('profile-form/keluarga', { title: 'Express' });
});

router.get('/profile/fisik', function(req, res, next) {
  res.render('profile-form/gambaran-fisik', { title: 'Express' });
});

router.get('/profile/harapan', function(req, res, next) {
  res.render('profile-form/harapan', { title: 'Express' });
});



module.exports = router;



function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
