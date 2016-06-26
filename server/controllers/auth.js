/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var AuthController    = {};
var userModel         = ModuleLoader.model('user');

AuthController.post = function (req, res) {
    res.json({success: true, profile:{name: "rain"}, token: "564565165mjdnj56" });
};

var exports = module.exports  = AuthController;
