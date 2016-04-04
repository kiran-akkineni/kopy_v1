/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = LoadModule.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var Message = new Schema({
  user_id: {
    type: String
  },
  message: {
    type: String
  },
  app_name: {
    type: String,
    default: 'slack'
  },
  app_user_name: {
    type: String
  },
  app_group_name: {
    type: String
  },
    created_at  : Date,
  updated_at  : {
    type: Date,
    default: Date.now }
});

module.exports = mongoose.model('message', Message);