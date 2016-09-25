/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var UserService       = {};
var Promise           = require('promise');
var userModel         = ModuleLoader.model('user');
var randomstring      = require("randomstring");
var encryptService    = ModuleLoader.service('encrypt');


//Check username is exist or not. If not, then it's update
//Consumer: Angular API
UserService.updateUsernameForAuthUser = function (req, res) {

    if ('token' in req.query) {
        userModel.findOne({token: req.query.token})
                 .then(function (user) {
                    if (user.length === 0) {
                        res.json({status:false, mgs: "Not a valid request"});
                    } else {
                        userModel.findOne({username: req.body.username})
                                  .then(function (result) {
                                      if (result === null) {
                                        user.username = req.body.username;
                                        userModel(user).save(function (err, result) {
                                          res.json({"status":true});
                                        });
                                    } else {
                                        res.json({"status":false, "mgs": "username is already taken."});
                                    }
                                 });
                    }
                 });
    } else {
         res.json({"status":false, "mgs": "Not a valid request"});
    }
};



//Get an user by Auth
//Consumer: Angular API
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


//Create an user my new user data
//Consumer: Skype
UserService.userCreation = function (data) {
    return new Promise(function (resolve, reject) {
        userModel.findByIdentifierAndAuthType(data.app_auth_identifier, data.app_name)
                 .then(function (result) {
                    if(_.isEmpty(result)){
                        var user                    = {};
                        user.auth_identifier        = data.app_auth_identifier; //very important
                        user.auth_type              = data.app_name;
                        user.username               = data.app_user_name;
                        user.is_password_created    = true;
                        user.created_at             = new Date();
                        var password                = randomstring.generate({length: 8, charset: 'alphabetic'});
                        user.password               = encryptService.encrypt(password.trim());

                        if(data.app_user_email)     user.email      = data.app_user_email;
                        if(data.app_user_fullname)  user.name       = data.app_user_fullname;
                        if(data.app_user_avater)    user.thumnil    = data.app_user_avater;



                        userModel(user).save(function (err, result) {
                            if(err) {
                                reject(err);
                            } else {
                                console.log('user created: ', user );
                                user.created = true;
                                resolve(user);
                            }
                        });
                    } else {
                        resolve(result);
                    }
                 })
                 .catch(function(err) {
                    reject(err);
                 })
    });
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


