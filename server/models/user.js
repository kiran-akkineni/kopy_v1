/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = ModuleLoader.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var User = new Schema({
  username: {   //unique
    type: String
  },
  auth_type: {
    type: String
  },
  name: {    //Full Name
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


User.statics.findByUsernameAndAuthType =  function(user_name, auth_type) {
    return this.findOne({username: user_name, auth_type: auth_type});
};

User.index({ "token": 1 }, { sparse: true } );
module.exports = mongoose.model('user', User);







