/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */
// Require the bcrypt package
var bcrypt          = require('bcrypt');
var salt            = bcrypt.genSaltSync(10);
var encryptService  = {};

encryptService.encrypt  = function (password) {
    return bcrypt.hashSync(password, salt);
};

var exports = module.exports  = encryptService;