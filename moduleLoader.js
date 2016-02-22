
/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

module.exports = {
  model : function (model) {
    return load(model, '/models/');
  },

  controller : function (controller) {
    return load(controller, '/');
  },

  service : function (service) {
    return load(service, '/services/');
  }
};

function load(module, directory) {
  if(typeof module === 'string') {
    var moduleLocation = [BaseUrl, directory, module, '.js'].join('');
    return require(moduleLocation);
  }
  if(module.constructor === Array) {
    return console.log('yup it\'s an array');
  }

}


