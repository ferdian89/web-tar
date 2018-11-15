var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var MemberSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    domisili: {type: String, required: true},
    domisili_mahrom: {type: String, required: true},
    tempat_lahir: {type: String, required: true},
    tanggal_lahir: {type: Date, required: true},
    email: {type: String, required: true},
    telepon: {type: String, required: true}
});

var IbadahSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    sholat_wajib: {type: String},
    pengajian: {type: String},
    bacaan_alquran: {type: String}
});


// Virtual for member "full" name.
MemberSchema
.virtual('name')
.get(function () {
  return this.first_name +' '+this.last_name;
});

// Virtual for book's URL
MemberSchema
.virtual('url')
.get(function () {
  return '/member/'+this._id;
});

MemberSchema.virtual('tanggal_lahir_yyyy_mm_dd').get(function () {
  return moment(this.tanggal_lahir).format('YYYY-MM-DD');
});

//Export model
module.exports = mongoose.model('Member', MemberSchema);
module.exports = mongoose.model('Ibadah', IbadahSchema);
