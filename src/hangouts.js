/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";

var hangoutsBot = require("hangouts-bot");

var bot = new hangoutsBot("someone@gmail.com", "password");

bot.on('online', function() {
    console.log('online');
});

bot.on('message', function(from, message) {
    console.log(from + ">> " + message);
});