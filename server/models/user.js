/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = ModuleLoader.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var User = new Schema({
  username: {
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
  password: {
    type: String
  },
  token: {
    type: String
  },
  is_password_created: {
    type   : Boolean,
    default: false
  },
  created_at  : {type: Date},
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

User.statics.findByUsernameAndAuthType =  function(user_name, auth_type) {
    return this.find({username: user_name, auth_type: auth_type});
};

User.index({ "token": 1 }, { sparse: true } );
module.exports = mongoose.model('user', User);







