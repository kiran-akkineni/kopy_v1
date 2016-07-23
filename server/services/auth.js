/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var AuthService    = {};
var userModel         = ModuleLoader.model('user');
var encryptService    = ModuleLoader.service('encrypt');
var uuid              = require('node-uuid');

AuthService.authenticate = function (req, res) {

    var  token = uuid.v4();


    console.log("requested password: ", encryptService.encrypt(req.body.password.trim()));
    userModel.findOne({ username: req.body.username.trim(), password: encryptService.encrypt(req.body.password.trim())}, function (err, user) {
        console.log("Auth user: ", user);
        if (user  === null) {
            res.json({success: false});
        } else {
            user.token = token;
            userModel(user).save(function (err, user) {
                if(err) {
                    res.json({success: false});
                } else {
                    console.log("authenticated successfully.");
                    res.json({success: true, profile:{name: user.name}, token: user.token});
                }

            });
        }
    })
};

var exports = module.exports  = AuthService;
