/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var mongoose = ModuleLoader.service('mongo'),
    Schema   = mongoose.Schema,
    util     = require('util');

var Note = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref : 'user'},
  message: {      //real note
    type: String
  },
  app_name: {     //slack, fb, skype, hangout
    type    : String,
    default : 'slack'
  },
  app_user_name: {   //username inside app
    type: String
  },
  app_group_name: {   //not important always
    type    : String,
    default : 'kopy'
  },
  created_at : Date,
  updated_at : {
    type    : Date,
    default : Date.now }
});

//compound
Note.index({ app_user_name: 1, app_group_name: -1 });
module.exports = mongoose.model('note', Note);