/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>, Kiran Akkineni <Kiran.home@gmail.com>
 */

"use strict";

// required libraries
global.base_path    = __dirname;
global.Config       = {};
global.ModuleLoader = require(base_path + '/moduleLoader.js');

var slackModel      = ModuleLoader.model('slack');

var Botkit          = require('botkit');







//Inputs from Slack
Config.clientId      = process.env.CLIENT_ID     || '19936248482.21489538647';
Config.clientSecret  = process.env.CLIENT_SECRET || 'c71c603cf8fce0c4d840ad9ca794c9c3';

//Database inputs
Config.port          = process.env.PORT          || 5000;
Config.conString     = process.env.DATABASE_URL  || 'postgres://vagrant@localhost:5432/vagrant';

Config.username      = process.env.USERNAME      || "kopychat@gmail.com ";
Config.password      = process.env.PGPASSWORD    || "slashkopy";

//Calling function to create database tables
slackModel.dbMigrate();


require(base_path + '/src/hangouts.js');
//Set debug to false
var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.configureSlackApp({
    clientId      : clientId,
    clientSecret  : clientSecret,
    redirect_uri  : 'https://kopychat.heroku.com',
    scopes        : ['bot', 'commands', 'team:read', 'users:read', 'outgoing-webhook'],
  }
);

controller.setupWebserver(port, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Successfully Authenticated. Visit your slack team.');
    }
  });

  webserver.get('/heartbeat',function(req,res) {
    res.send('OK');
  });

  webserver.get('/app',function(req,res) {
    var html = '<a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=19936248482.21489538647"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>';
    res.send(html);
  });

  webserver.get('/migrate',function(req,res) {
    dbMigrate();
    res.send('DB migration is done.');
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
          convo.say("Hi, I'm kopy!");
          convo.say("Use me or /kopy command to save important notes for later :sun_with_face:");
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
controller.hears(
  ["[A-Za-z0-9_^kopylist]"],
  ["direct_message", "direct_mention", "mention", "message_received"],function(bot, message) {
  var data = {};

  data.user_id        = message.user;
  data.message        = message.text;
  data.app_name       = 'slack';
  data.app_group_name = bot.config.name;


  bot.api.users.info({'user': message.user}, function(err, response) {
    data.app_user_name  = response.user.name;
    savekopy(data);
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say(':memo: :notebook_with_decorative_cover: Got it, boss - ' + message.text);
  });
});

controller.on('slash_command', function(bot,message) {
  var data = {};

  data.user_id          = message.user_id;
  data.message          = message.text;
  data.app_name         = 'slack';
  data.app_user_name    = message.user_name;
  data.app_group_name   = message.team_domain;


  bot.replyPrivate(message, ':+1: Message saved - ' + message.text);
  savekopy(data);
});


