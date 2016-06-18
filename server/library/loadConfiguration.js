/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';
module.exports = function(app) {

  // connect the bot to a stream of messages
    app.configureSlackApp({clientId      : Config.clientId,
                           clientSecret  : Config.clientSecret,
                           redirect_uri  : Config.redirect_uri,
                           scopes        : ['bot', 'commands', 'team:read', 'users:read', 'outgoing-webhook']});

  // just a simple way to make sure we don't
    // connect to the RTM twice for the same team
    var _bots = {};
    function trackBot(bot) {
      _bots[bot.config.token] = bot;
    }


    //creating bot
    app.on('create_bot', function(bot,config) {

      if (_bots[bot.config.token]) {
        // already online! do nothing.
      } else {
        bot.startRTM(function(err) {

          if (!err) {
            trackBot(bot);
          }

          bot.startPrivateConversation({user: config.createdBy}, function(err,convo) {
            if (err) {
              console.log(err);
            } else {
              convo.say("Hi, I'm kopy!");
              convo.say("Use me or /kopy command to save important notes for later :sun_with_face:");
            }
          });

        });
      }
    });


    // Handle events related to the websocket connection to Slack
    app.on('rtm_open', function(bot) {
      console.log('The RTM api just connected!');
    });

    app.on('rtm_close', function(bot) {
      console.log('The RTM api just closed');
    });
}


