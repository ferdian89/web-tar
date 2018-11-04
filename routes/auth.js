var express = require('express');
var router = express.Router();
const passport = require('passport');

var auth_controller = require('../controllers/auth_controller');
/* GET users listing. */


router.get('/signup', auth_controller.signup_get);
router.post('/signup', auth_controller.signup_post);



module.exports = router;
