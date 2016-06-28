/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var AuthController    = {};
var userModel         = ModuleLoader.model('user');
var encryptService    = ModuleLoader.service('encrypt');
var uuid              = require('node-uuid');

AuthController.post = function (req, res) {

    var  token = uuid.v4();
    
    User.findOne({ username: req.body.username, password:encryptService.encrypt(req.body.password)}, function (err, user) {
        if(user.length === 0) {
            res.json({success: false});
        } else {
            user.token = token;
            user.save(function (err) {
                res.json({success: true, profile:{name: user.name}, token: user.token});
            });
        }
    })
};

var exports = module.exports  = AuthController;
