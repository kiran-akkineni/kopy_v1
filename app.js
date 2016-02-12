/**
 * @author Eftakhairul Islam <eftakharul@gmail.com>
 */

"use strict";

var Botkit  = require('botkit');
var pg      = require('pg');
var util    = require('util');


var clientId      = process.env.CLIENT_ID     || '3217634342.20399675426';
var clientSecret  = process.env.CLIENT_SECRET || 'dabe3eb3bfba517ca14fcd1a43c46ac7';
var port          = process.env.PORT          || 3000;
var connection    = process.env.DATABASE_URL  || 'postgres://vagrant@localhost:5432/vagrant';

//debug mode set to false
var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.configureSlackApp({
    clientId      : clientId,
    clientSecret  : clientSecret,
    redirect_uri  : 'http://6e23b8a5.ngrok.io',
    scopes        : ['bot', 'commands', 'team:read', 'users:read', 'outgoing-webhook'],
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
controller.hears('','direct_message,direct_mention,mention',function(bot, message) {
  var data = {};

  data.user_id        = message.user;
  data.message        = message.text;
  data.app_name       = 'slack';
  data.app_group_name = bot.config.name;

  bot.api.users.info({'user': message.user}, function(err, response) {
    data.app_user_name  = response.user.name;
    saveKnote(db, data);
  });

  bot.reply(message,'Your message has been saved. Thank you.')
});

controller.on('slash_command', function(bot,message) {
  console.log(message);

  var data = {};

  data.user_id          = message. user_id;
  data.message          = message.text;
  data.app_name         = 'slack';
  data.app_user_name    = message.user_name;
  data.app_group_name   = message.team_domain;

  bot.replyPublic(message, 'Your message has been saved. Thank you.');
  saveKnote(db, data);
});


function saveKnote(data) {

  var querySrring = util.format("INSERT INTO knote (user_id,message,app_name,app_user_name,app_group_name) VALUES ('%s','%s','%s','%s','%s')",
                                  data.user_id,
                                  data.message,
                                  data.app_name,
                                  data.app_user_name,
                                  data.app_group_name);

   // Get a Postgres client from the connection pool
    pg.connect(connection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return false;
        }



        // SQL Query > Select Data
        var query = client.query(querySrring);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return true;
        });
    });
};