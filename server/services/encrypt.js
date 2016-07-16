/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */
var crypto              = require('crypto'),
    algorithm           = 'aes-256-ctr',
    password            = 'kopy',
    encryptService      = {};


encryptService.encrypt = function(text){
  var cipher    = crypto.createCipher(algorithm,password),
      crypted   = cipher.update(text,'utf8','hex');

  crypted += cipher.final('hex');
  return crypted;
};

var exports = module.exports  = encryptService;