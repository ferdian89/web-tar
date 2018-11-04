var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    domisili: {type: String, required: true},
    domisili_mahrom: {type: String},
    umur: {type: Number},
    status: {type: String},
    pendidikan: [{
      "jenjang": String
    }]
  }
);

// Virtual for member "full" name.
MemberSchema
.virtual('name')
.get(function () {
  return this.first_name +', '+this.last_name;
});

// Virtual for book's URL
MemberSchema
.virtual('url')
.get(function () {
  return '/member/'+this._id;
});

//Export model
module.exports = mongoose.model('Member', MemberSchema);
