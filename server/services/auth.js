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
    
    userModel.findOne({ username: req.body.username, password: encryptService.encrypt(req.body.password)}, function (err, user) {
        if(user.length === 0) {
            res.json({success: false});
        } else {
            user.token = token;
            userModel(user).save(function (err) {
                res.json({success: true, profile:{name: user.name}, token: user.token});
            });
        }
    })
};

var exports = module.exports  = AuthService;
