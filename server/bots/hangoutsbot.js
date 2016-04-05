/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";
var message    = ModuleLoader.model('message');
module.exports =  function(hangoutsBot)  {

    var bot = new hangoutsBot(Config.username,
                              Config.password);

    bot.on('online', function() {
        console.log('online');
    });

    bot.on('message', function(from, message) {

        var data = {};

        data.user               = from;
        data.message            = message;
        data.app_name           = 'hangouts';
        data.app_group_name     = '_kopychat';
        
        new message(data).save()
                       .then(function (result) {
                           console.log("slack message is saved. count: " + result.length);
                       }, function (err) {
                          console.log('failed');
                       });
    })
};

