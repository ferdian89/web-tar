var express = require('express');
var router = express.Router();
var member_controller = require('../controllers/memberController');

/* GET home page. */
router.get('/', member_controller.member_list_limit);

/* Get Full Profile */
router.get('/myprofile', function(req, res, next) {
  res.render('full-profile');
});


router.get('/member/dashboard', function(req, res, next) {
  res.render('profile-form/profile', { title: 'Express' });
});


// GET request to create member.
router.get('/member/data', member_controller.member_create_get);

// POST request to create member.
router.post('/member/data', member_controller.member_create_post);

// GET request to update member.
router.get('/member/:id/update', member_controller.member_update_get);

// POST request to update member.
router.post('/member/:id/update', member_controller.member_update_post);

// GET request for one member.
router.get('/member/:id/', member_controller.member_detail);

// GET request for list of all Members.
router.get('/members/', member_controller.member_list);











router.get('/profile/pengalaman', function(req, res, next) {
  res.render('profile-form/pengalaman', { title: 'Express' });
});

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
