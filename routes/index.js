var express = require('express');
var router = express.Router();
const passport = require('passport');
var Member = require('../models/member');

var member_controller = require('../controllers/memberController');


/* GET home page. */
router.get('/', member_controller.member_list_limit);

// Get list link of forms
router.get('/myprofile', function(req, res, next) {
  res.render('full-profile');
});

router.get('/member/myprofile', isLoggedIn, function(req, res, next) {
  //var member = new Member(req.session.member);
  res.render('profile-form/profile');
});

// Get detail data member
router.get('/member/:id/', isLoggedIn, member_controller.member_detail);

// GET request for list of all Members.
router.get('/member/dashboard', isLoggedIn, member_controller.member_list);

// create and update of Main data
router.get('/member/data', isLoggedIn, member_controller.member_create_get);
router.post('/member/data', isLoggedIn, member_controller.member_create_post);
router.get('/member/:id/update', isLoggedIn, member_controller.member_update_get);
router.post('/member/:id/update', isLoggedIn, member_controller.member_update_post);


// create and update of pendidikan data
router.get('/member/:id/pendidikan', isLoggedIn, member_controller.member_create_get_pend);
router.post('/member/:id/ pendidikan', isLoggedIn, member_controller.member_create_post_pend);
router.get('/member/:id/update', isLoggedIn, member_controller.member_update_get);
router.post('/member/:id/update', isLoggedIn, member_controller.member_update_post);





module.exports = router;



function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
