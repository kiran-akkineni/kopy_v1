/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>, Kiran Akkineni <Kiran.home@gmail.com>
 */

"use strict";
var slackModel      = ModuleLoader.model('slack');
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');

module.exports =  function(Botkit)  {
    //Set debug to false
    var controller = Botkit.slackbot({
      debug: false
    });

    // connect the bot to a stream of messages
    controller.configureSlackApp({
        clientId      : Config.clientId,
        clientSecret  : Config.clientSecret,
        redirect_uri  : Config.redirect_uri,
        scopes        : ['bot', 'commands', 'team:read', 'users:read', 'outgoing-webhook'],
      }
    );

    controller.setupWebserver(Config.port, function(err, webserver) {
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


     //serving static
     webserver.use(express.static("./node_modules/"));
     webserver.use(express.static("./app/"));

     webserver.use(bodyParser.urlencoded({ extended: false }));
     webserver.use(cookieParser());
     webserver.use(express.static('./public'));

     webserver.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, x-access-token, Authorization, Accept');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

      webserver.get('/message', function(req,res) {
          slackModel.find(function(result) {
            res.json(result);
        });
      });

      webserver.get('/migrate',function(req,res) {
        slackModel.migrate();
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
    controller.hears(["[A-Za-z0-9_^kopylist]"],
                     ["direct_message", "direct_mention", "mention", "message_received"], function(bot, message) {
      var data = {};

      data.user_id        = message.user;
      data.message        = message.text;
      data.app_name       = 'slack';
      data.app_group_name = bot.config.name;


      bot.api.users.info({'user': message.user}, function(err, response) {
        data.app_user_name  = response.user.name;
        slackModel.savekopy(data);
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
      slackModel.savekopy(data);
    })
};

