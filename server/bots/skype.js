/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";
var builder = require('botbuilder');
module.exports =  function(server)  {

    var connector = new builder.ChatConnector({ appId: Config.MS_APP_ID,
                                                appPassword: Config.MS_APP_SECRET
                                            });


    var bot = new builder.UniversalBot(connector);
    server.post('/skype/chat', connector.listen());

    //Bot on
    bot.on('contactRelationUpdate', function (message) {

        console.log(message);

        if (message.action === 'add') {
            var name = message.user ? message.user.name : null;
            var reply = new builder.Message()
                    .address(message.address)
                    .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
            bot.send(reply);
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
        if(session.message.text.toLowerCase().contains('hello')){
          session.send("Hey, How are you?");
          }else if(session.message.text.toLowerCase().contains('help')){
            session.send("How can I help you?");
          }else{
            session.send("Sorry I don't understand you...");
          }
    });
};