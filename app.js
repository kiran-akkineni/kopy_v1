/**
 * @author Eftakhairul Islam <eftakharul@gmail.com>
 */

"use strict";

var Botkit  = require('botkit');


var clientId      = process.env.clientId || '3217634342.20399675426';
var clientSecret  = process.env.clientSecret || 'dabe3eb3bfba517ca14fcd1a43c46ac7';
var port          = process.env.port || 3000;


//debug mode set to false
var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.configureSlackApp({
    clientId      : clientId,
    clientSecret  : clientSecret,
    redirect_uri  : 'https://fa0a7b79.ngrok.io',
    scopes        : ['bot', 'commands', 'outgoing-webhook'],
  }
);



controller.setupWebserver(port, function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

// just a simple way to make sure we don't
// connect to the RTM twice for the same team
var _bots = {};
function trackBot(bot) {
  _bots[bot.config.token] = bot;
}


controller.on('create_bot', function(bot,config) {

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
          convo.say('I am the knote, just joined your team');
          convo.say('You must now /invite me to a channel so that I can be of use!');
        }
      });

    });
  }

});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function(bot) {
  console.log('The RTM api just connected!');
});

controller.on('rtm_close', function(bot) {
  console.log('The RTM api just closed');
});

// give the bot something to listen for.
controller.hears('','direct_message,direct_mention,mention',function(bot,message) {
  console.log(message);
  //console.log(message.text);
  bot.reply(message,'Hey how are you today?')
});

controller.on('slash_command', function(bot,message) {

  console.log(message);

  bot.replyPublic(message,'<@' + message.user + '> is cool!');
  bot.replyPrivate(message,'*nudge nudge wink wink*');

});

