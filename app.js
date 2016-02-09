/**
 * @author Eftakhairul Islam <eftakharul@gmail.com>
 */

"use strict";

var express = require('express');
var app     = express();
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
    redirect_uri  : 'https://564e90dc.ngrok.io',
    scopes        : ['bot', 'commands'],
  }
);



controller.setupWebserver(process.env.port,function(err,webserver) {
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


controller.on('create_bot',function(bot,config) {

  if (_bots[bot.config.token]) {
    // already online! do nothing.
  } else {
    bot.startRTM(function(err) {

      if (!err) {
        trackBot(bot);
      }
    });
  }

});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open',function(bot) {
  console.log('** The RTM api just connected!');
});

controller.on('rtm_close',function(bot) {
  console.log('** The RTM api just closed');
  // you may want to attempt to re-open
});

// give the bot something to listen for.
controller.hears('','direct_message,direct_mention,mention',function(bot,message) {
  console.log(message.text);
  bot.reply(message,'Hey how are you today?')
});