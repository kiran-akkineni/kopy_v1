/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";
var messageModel  = ModuleLoader.model('slack');

module.exports =  function(hangoutsBot)  {
    var bot = new hangoutsBot(Config.username,
                              Config.password);

    bot.on('online', function() {
        console.log('online');
    });

    bot.on('message', function(fromuser, message) {
        console.log(bot);
        console.log(fromuser);
        console.log(fromuser + ">> " + message);
        var data = {};

        data.user        = fromuser;
        data.message     = message;
        data.app_name    = 'hangouts';
        data.app_group_name = '_kopychat'
        
        messageModel.savekopy(data);
    })
};

