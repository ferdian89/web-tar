var Member = require('../models/member');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');
const User = require('../models/user');



// Display list of all member.
exports.member_list = function (req, res, next) {
    Member.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_members) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('dashboard',  { member_list: list_members });
        })
};

exports.member_list_limit = function (req, res, next) {
    Member.find()
        .sort([['last_name', 'ascending']])
        .exec(function (err, list_members) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('index',  { member_list: list_members });
        })
};

// Display detail page for a specific Member.
exports.member_detail = function (req, res, next) {
    async.parallel({
        member: function (callback) {
            Member.findById(req.params.id)
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.member == null) { // No results.
            var err = new Error('Member not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('member-profile', { title: 'Member Detail', member: results.member, member_books: results.members_books });
    });
};


// Display member create form on GET.


exports.member_create_get = function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/user/signin');
    }
    var member = new (req.session.user);
    res.render('profile-form/data-diri');
  };


// Handle book create on POST.

  exports.member_create_post = [
// Convert the genre to an array.


// Validate fields.
  body('first_name', 'domisili must not be empty.').isLength({ min: 1 }).trim(),
  body('last_name', 'domisili must not be empty.').isLength({ min: 1 }).trim(),
  body('domisili', 'domisili must not be empty.').isLength({ min: 1 }).trim(),
  body('domisili_mahrom', 'domisili must not be empty.').isLength({ min: 1 }).trim(),


  // Sanitize fields (using wildcard).
  sanitizeBody('first_name').trim().escape(),
  sanitizeBody('last_name').trim().escape(),
  sanitizeBody('domisili').trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a Book object with escaped and trimmed data.
            var member = new Member(
              {
                user: req.user,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                domisili: req.body.domisili,
                domisili_mahrom: req.body.domisili_mahrom
               });

          if (!errors.isEmpty()) {
              // There are errors. Render the form again with sanitized values/error messages.
              res.render('profile-form/data-diri');
          return;
          }
          else {
              // Data from form is valid.
              // Check if Genre with same name already exists.
              // Data from form is valid. Save book.
              member.save(function (err) {
                  if (err) { return next(err); }
                     //successful - redirect to new book record.
                     res.redirect(member.url);
                  });
          }
        }
    ];


// Display Member update form on GET.
    exports.member_update_get = function (req, res, next) {

        Member.findById(req.params.id, function (err, results) {
            if (err) { return next(err); }
            if (results.member == null) { // No results.
                var err = new Error('Member not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('profile-form/data-diri', { title: 'Update Member', member: results.member });

        });
    };


// Handle Member update on POST.
    exports.member_update_post = [

      // Validate fields.
        body('first_name', 'domisili must not be empty.').isLength({ min: 1 }).trim(),
        body('last_name', 'domisili must not be empty.').isLength({ min: 1 }).trim(),
        body('domisili', 'domisili must not be empty.').isLength({ min: 1 }).trim(),


        // Sanitize fields (using wildcard).
        sanitizeBody('first_name').trim().escape(),
        sanitizeBody('last_name').trim().escape(),
        sanitizeBody('domisili').trim().escape(),

        // Process request after validation and sanitization.
        (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create Member object with escaped and trimmed data (and the old id!)
            var member = new Member(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    domisili: req.body.domisili,
                    _id: req.params.id
                }
            );

            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values and error messages.
                res.render('profile-form/data-diri', { title: 'Update Member', member: member, errors: errors.array() });
                return;
            }
            else {
                // Data from form is valid. Update the record.
                Member.findByIdAndUpdate(req.params.id, member, {}, function (err, member) {
                    if (err) { return next(err); }
                    // Successful - redirect to genre detail page.
                    res.redirect(member.url);
                });
            }
        }
    ];

exports.member_create_get_pend = function(req, res, next) {
  Member.findById(req.params.id)
  res.render('profile-form/pendidikan')
}


exports.member_create_post_pend = (req, res, next) => {
          // Create a Book object with escaped and trimmed data.
          var member = new Member(
            {
              pendidikan: req.body.pendidikan
             });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('profile-form/pendidikan');
        return;
        }
        else {
            member.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(member.url);
                });
        }
      }
