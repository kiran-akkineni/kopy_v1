/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = ModuleLoader.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var Usernote = new Schema({
  app_group_name: {
    type: String
  },
  app_user_name: {
    type: String
  },
  email: {
    type: String
  },
  created_at  : Date,
  updated_at  : {
    type: Date,
    default: Date.now }
});


Usernote.statics.findByEmail =  function(email, cb) {
    this.find({email: email}, function (err, result) {
      if (err) {
        throw err;
      } else {
        if (cb) cb(result);
      }
    });
};

module.exports = mongoose.model('user_note', Usernote);







