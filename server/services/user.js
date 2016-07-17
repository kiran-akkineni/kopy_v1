/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var UserService  = {};
var Promise      = require('promise');
var userModel    = ModuleLoader.model('user');


UserService.getByAuthUser = function (req, res) {

    if ('token' in req.query) {
        userModel.findOne({token: req.query.token})
            .then(function (result) {
                if (result.length === 0) {
                    res.json([]);
                } else {
                    res.json(result);
                }
            });
    } else {
        res.json([]);
    }
};

UserService.resetPassword =  function (data) {

    return new Promise(function (resolve, reject) {

        userModel.findByUsernameAndAuthType(data.app_user_name.trim().toString(), data.app_name, function (err, user) {
            if (err) {
                reject(false);
            } else {
                var password                = randomstring.generate({length: 8, charset: 'alphabetic'});
                user.password               = encryptService.encrypt(password.trim());

                userModel(user).save(function (err, result) {
                  //updating the password
                  user.password   = password.trim();
                  //password generation trigger
                  resolve(user);
                });
          }
        });
    });
};
    
UserService.post = function (req, res) {
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

UserService.createUserNoteMap = function (req, res) {
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

UserService.getUserNoteMap = function (req, res) {

    userNoteModel.findByEmail(req.query.email, function (results) {
      if (results.length > 0) {
          res.json(results);
      } else {
          res.json([]);
      }
    });
};

var exports = module.exports  = UserService;


