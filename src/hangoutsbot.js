/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";

module.exports =  function(hangoutsBot)  {
    var bot = new hangoutsBot(Config.username,
                              Config.password);

    bot.on('online', function() {
        console.log('online');
    });

    bot.on('message', function(from, message) {
        console.log(bot);
        console.log(from);
        console.log(from + ">> " + message);
    })
};

