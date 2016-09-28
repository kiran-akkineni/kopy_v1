/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";
var builder         = require('botbuilder');
var userService     = ModuleLoader.service('user');
var randomstring    = require("randomstring");
var noteService     = ModuleLoader.service('note');
module.exports =  function(server)  {

    var connector = new builder.ChatConnector({ appId: Config.MS_APP_ID,
                                                appPassword: Config.MS_APP_SECRET
                                            });


    var bot = new builder.UniversalBot(connector);
    server.post('/skype/chat', connector.listen());

    //Bot on
    bot.on('contactRelationUpdate', function (message) {

        if (message.action === 'add') {


             var data                   =  {};
             data.app_name              = 'skype';
             data.app_user_name         =  'skype_' + randomstring.generate({length: 6, charset: 'alphabetic'});
             data.app_auth_identifier   =  message.user.id;
             data.app_group_name        =  'kopy';
             data.app_user_fullname     =  message.user ? message.user.name : null;
             data.created_at            =  new Date();

            var reply = new builder.Message().address(message.address);

            userService.userCreation(data).then(function (user) {
                if(user.created) {
                    reply.text('Welcome Boss. Your username: '+  user + '& password: '+ user.password);
                } else {
                    reply.text('Welcome back Boss');
                }

                bot.send(reply);
            })
        } else {
            // delete their data
        }
    });

    bot.on('typing', function (message) {
      // User is typing
    });

    bot.on('deleteUserData', function (message) {
        // User asked to delete their data
    });

    //=========================================================
    // Bots Dialogs
    //=========================================================

    String.prototype.contains = function(content){
      return this.indexOf(content) !== -1;
    }

    bot.dialog('/', function (session) {

        var data              = {created_at  : new Date(),
                                 updated_at  : new Date()};

        data.message              = session.message.text;
        data.app_name             = 'skype';
        data.app_auth_identifier  = session.message.user.id;
        data.app_group_name       = 'kopy';

      noteService.save(data, function (user) {
          session.send("Got it, boss");
      });
    });
};