/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>, Kiran Akkineni <Kiran.home@gmail.com>
 */

"use strict";
var authService     = ModuleLoader.service('auth');
var userService     = ModuleLoader.service('user');
var noteService     = ModuleLoader.service('note');
var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');

var skypebot        = ModuleLoader.bot('skype');


module.exports =  function(Botkit)  {
    //Set debug to false
    var controller = Botkit.slackbot({debug: false});
    ModuleLoader.library('loadConfiguration')(controller);    

    controller.setupWebserver(Config.port, function(err, webserver) {
      controller.createWebhookEndpoints(controller.webserver);
      controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
        if (err) {
          res.status(500).send('ERROR: ' + err);
        } else {
          res.send('Successfully Authenticated. Visit your slack team.');
        }
      });

      //serving static
      webserver.use(express.static("./node_modules/"));
      webserver.use(express.static("./app/"));

      //midlewares
      webserver.use(bodyParser.json());
      webserver.use(bodyParser.urlencoded({ extended: false }));
      webserver.use(cookieParser());
      webserver.use(express.static('./public'));

      //cross-side request accept
      webserver.use(function (req, res, next) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
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

         var message        = req.body.entry[0].messaging[0];
         var jsonData       = {};

         jsonData.recipient = {id: message.sender.id};
         jsonData.message   = {text: "Got it, boss :)"};

         var data                   = {};
         data.message               = message.message.text;
         data.app_name              = 'facebook';
         data.app_user_name         = message.sender.id;
         data.app_auth_identifier   =  message.sender.id;
         data.app_group_name        = 'kopy';
         data.created_at            = new Date();

        noteService.save(data, function (user) {
              console.log(user);
              if(user) {
                  //response back that message is saved
                  jsonData.message.text = 'Boss!!! New account has been created for you. Username: ' + user.username + '  & Password: ' + user.password;
              }

              client.post('v2.6/me/messages?access_token=' + Config.page_token, jsonData, function(err, res, body) {
                 //local logging purposes..
                  console.log('response sent successfully. Status: ' + res.statusCode);
              });
          });

        res.sendStatus(200);
      });


      webserver.get('/heartbeat',function(req,res) { res.json({status:'Okay'})});
      webserver.get('/note', function(req,res) { noteService.getByAuthUser(req,res)});
      webserver.get('/profile', function(req,res) {userService.getByAuthUser(req,res)});
      webserver.post('/authenticate',function(req,res) {authService.authenticate(req, res);});
      webserver.put('/profile/username',function(req,res) {userService.updateUsernameForAuthUser(req, res);});
      webserver.get('/note/export_csv',function(req,res) {noteService.exportCSVByAuthUser(req,res)});

      //skypebot
      skypebot(webserver);
    });




    // give the bot something to listen for.
    controller.hears(["[A-Za-z0-9_^kopylist]"],
                     ["direct_message", "direct_mention",
                      "mention"], function(bot, message) {

      var data             = {app_name    : 'slack',
                              created_at  : new Date(),
                              updated_at  : new Date()};

      data.message        = message.text;
      data.app_group_name = bot.config.name;


      bot.api.users.info({'user': message.user}, function(err, response) {
          data.app_auth_identifier  = response.user.name;

          if (response && response.user && response.user.profile) {
                data.app_user_name      = response.user.profile.email;
                data.app_user_email     = response.user.profile.email;
                data.app_user_fullname  = response.user.profile.real_name;
                data.app_user_avater    = response.user.profile.image_24;
          }

          noteService.save(data, function (user) {
              console.log(user);
              if(user) {
                  //response back that message is saved
                  bot.startPrivateConversation(message, function(err,dm) {
                    dm.say('Boss!!! New account has been created for you. Username: ' + user.username + '  & Password: ' + user.password);
                  });
              } else {
                  //response back that message is saved
                  bot.startPrivateConversation(message, function(err,dm) {
                    dm.say(':memo: :notebook_with_decorative_cover: Got it, boss - ' + message.text);
                  });
              }
          })
      });

    });


    //Slash command
    controller.on('slash_command', function(bot,message) {
      var data              = {created_at  : new Date(),
                               updated_at  : new Date()};

      data.message              = message.text;
      data.app_name             = 'slack';
      data.app_auth_identifier  = message.user_name;
      data.app_group_name       = message.team_domain;
      data.app_user_name        = message.user_name;

        bot.api.users.info({'user': message.user}, function(err, response) {
            if (response && response.user && response.user.profile) {
                data.app_user_name      = response.user.profile.email;
                data.app_user_email     = response.user.profile.email;
                data.app_user_fullname  = response.user.profile.real_name;
                data.app_user_avater    = response.user.profile.image_24;
            }
        });

      //bot.replyPrivate(message, ':+1: Message saved - ' + message.text);
      noteService.save(data, function (user) {
          if (user) {
              bot.replyPrivate(message,'Boss!!! New account has been created for you. Username: ' + user.username + '  & Password: ' + user.password);
          } else {
              bot.replyPrivate(message,':memo: :notebook_with_decorative_cover: Got it, boss - ' + message.text);
          }
      })
    });
};