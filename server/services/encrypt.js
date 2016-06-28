/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */
// Require the bcrypt package
var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync("kopy");

var encryptService = {};

encryptService.prototype.encrypt  = function (password) {
    return bcrypt.hashSync(password, salt);
};

var exports = module.exports  = encryptService;