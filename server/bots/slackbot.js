/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>, Kiran Akkineni <Kiran.home@gmail.com>
 */

"use strict";
var nodeModel       = ModuleLoader.model('note');
var userController  = ModuleLoader.controller('user');
var noteController  = ModuleLoader.controller('note');
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var lastText        = "";

module.exports =  function(Botkit)  {
    //Set debug to false
    var controller = Botkit.slackbot({debug: false});

    // connect the bot to a stream of messages
    controller.configureSlackApp({clientId      : Config.clientId,
                                  clientSecret  : Config.clientSecret,
                                  redirect_uri  : Config.redirect_uri,
                                  scopes        : ['bot', 'commands', 'team:read', 'users:read', 'outgoing-webhook']});

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


      webserver.use(bodyParser.json());
      webserver.use(bodyParser.urlencoded({ extended: false }));
      webserver.use(cookieParser());
      webserver.use(express.static('./public'));

      webserver.use(function (req, res, next) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

         next();
      });

      //for verifying fb auth
      webserver.get('/fb/webhook', function(req,res) {
         if (req.query['hub.verify_token'] === Config.fb_token) {

             console.log(req.query);
            res.send(req.query['hub.challenge']);
          } else {
            res.send('Error, wrong validation token');
          }
      });

      webserver.post('/fb/webhook', function(req, res) {

          console.log('fb request came');
         var message        = req.body.entry[0].messaging[0];
         lastText           =  message.message.text;
         var jsonData       = {};

         jsonData.recipient = {id: message.sender.id};
         jsonData.message   = {text: "Got it, boss :)"};

          if(lastText != message.message.text) {
                client.post('v2.6/me/messages?access_token=' + Config.page_token, jsonData, function(err, res, body) {
                  console.log(res.statusCode);
              });
          }
      });


      webserver.get('/note', function(req,res) {
         noteController.get(req, res);
      });

      webserver.post('/user',function(req,res) {
          userController.post(req, res);
      });

      webserver.post('/user_note_map', function(req,res) {
          userController.createUserNoteMap(req, res);
      });

      webserver.get('/user_note_map', function(req,res) {
          userController.getUserNoteMap(req, res);
      });
    });



    // just a simple way to make sure we don't
    // connect to the RTM twice for the same team
    var _bots = {};
    function trackBot(bot) {
      _bots[bot.config.token] = bot;
    }


    //creating bot
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
                     ["direct_message", "direct_mention",
                      "mention"], function(bot, message) {

      var data             = {app_name    : 'slack',
                              created_at  : new Date(),
                              updated_at  : new Date()};

      data.user_id        = message.user;
      data.message        = message.text;
      data.app_name       = 'slack';
      data.app_group_name = bot.config.name;


      bot.api.users.info({'user': message.user}, function(err, response) {

        data.app_user_name  = response.user.name;

        //saving bot message
        nodeModel(data).save(function () {
          console.log("slack message is saved.");
        });
      });

      //response back that message is saved
      bot.startPrivateConversation(message,function(err,dm) {
        dm.say(':memo: :notebook_with_decorative_cover: Got it, boss - ' + message.text);
      });
    });



    //slash command
    controller.on('slash_command', function(bot,message) {
      var data              = {};
      data.user_id          = message.user_id;
      data.message          = message.text;
      data.app_name         = 'slack';
      data.app_user_name    = message.user_name;
      data.app_group_name   = message.team_domain;
      data.created_at       = new Date();

      bot.replyPrivate(message, ':+1: Message saved - ' + message.text);
        
      nodeModel(data).save(function () {
          console.log("slack message is saved.");
      });
    });
};

