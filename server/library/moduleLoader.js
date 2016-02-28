/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';
module.exports = {
  model : function (model) {
    return load(model, '/models/');
  },

  bot : function (bot) {
    return load(bot, '/bots/');
  },

  controller : function (controller) {
    return load(controller, '/controllers/');
  },

  service : function (service) {
    return load(service, '/services/');
  }
};

function load(module, directory) {
  if(typeof module === 'string') {
    var moduleLocation = [base_path, directory, module, '.js'].join('');
    console.log(moduleLocation);

    return require(moduleLocation);
  }
  if(module.constructor === Array) {
    return console.log('yup it\'s an array');
  }
}


