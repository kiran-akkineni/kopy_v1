/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = ModuleLoader.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var User = new Schema({
  auth_user_id: {
    type: String
  },
  auth_type: {
    type: String
  },
  name: {
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

User.statics.findByEmail =  function(email, cb) {
    this.find({email: email}, function (err, result) {
      if (err) {
        throw err;
      } else {
        if (cb) cb(result);
      }
    });
};

module.exports = mongoose.model('user', User);







