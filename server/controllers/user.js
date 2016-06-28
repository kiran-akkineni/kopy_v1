/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var UserController  = {};
var userModel       = ModuleLoader.model('user');
var userNoteModel   = ModuleLoader.model('user_note');

    
UserController.post = function (req, res) {
    var data          = {};
    data.name         = req.body.name;
    data.email        = req.body.email;

    var auth          = req.body.user_id.split("|");

    data.auth_type    = auth[0];
    data.auth_user_id = (auth.length > 1)? auth[1]:'';


    userModel.find({email: data.email.trim().toString()}, function (err, result) {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.json({status: 'user already exist.'});
            } else {
              userModel(data).save(function (err) {
                   if (err) throw err;
                    res.json({status: 'okay'});
                   });
            }
          }
        });
    
};

UserController.createUserNoteMap = function (req, res) {
    var map              = {};
    map.email            = req.body.email;
    map.app_group_name   = req.body.app_group_name;
    map.app_user_name    = req.body.app_user_name;
    map.created_at       = new Date();
    map.updated_at       = new Date();

    userNoteModel.findByEmail(map.email, function (results) {

      if (results.length > 0) {
          console.log('mapping is already exist');
      } else {
        userNoteModel(map).save(function () {
          console.log('new map created.');
        });
      }
    });

    res.json({status: 'okay'});
};

UserController.getUserNoteMap = function (req, res) {

    userNoteModel.findByEmail(req.query.email, function (results) {
      if (results.length > 0) {
          res.json(results);
      } else {
          res.json([]);
      }
    });
};

var exports = module.exports  = UserController;


