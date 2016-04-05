'use strict';
var mongoose = require('mongoose');

module.exports = (function(app) {
	mongoose.connect(Config.conString);
	return mongoose;
})();
