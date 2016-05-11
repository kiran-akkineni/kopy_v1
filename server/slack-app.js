/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>, Kiran Akkineni <Kiran.home@gmail.com>
 */

"use strict";

// required libraries
global.base_path      = __dirname;
global.Config         = {};

global.ModuleLoader   = require(base_path + '/library/moduleLoader.js');

var Botkit            = require('botkit');
var hangoutsBot       = require('hangouts-bot');

//Inputs from Slack
Config.clientId       = process.env.CLIENT_ID     || '19936248482.21489538647';
Config.clientSecret   = process.env.CLIENT_SECRET || 'c71c603cf8fce0c4d840ad9ca794c9c3';
Config.redirect_uri   = process.env.REDIRECT_URI  || 'https://bot.ofra.in';

//Database inputs
Config.port           = process.env.PORT          || 5000;
//Config.conString    = 'mongodb://kopychat:kopychat@ds025429.mlab.com:25429/heroku_kdbnfgkk';
Config.conString      = 'mongodb://localhost/kopy';

//hangouts
Config.username       = process.env.USERNAME      || 'kopychat@gmail.com';
Config.password       = process.env.PASSWORD      || 'slashkopy0';

//fb
Config.fb_token       = process.env.FB_TOKEN      || 'fb_kopy';
Config.page_token     = "EAABz2BdMM9YBAIPboReAd8yAeckd86UEEVdDGrJZB2PJAiR9NE9AZAwCbSTD5v7jdA2qTcTK7ARyCxCuYOI1Fxo6fZBQMrWOW4SsTZBqMRaWrOem8dC5z9Kub04kYzxpfalPcrVdmZC5pwR1Ock1X8mgZAMmQI327O367Fxhy55QZDZD";



var slackbot          = ModuleLoader.bot('slackbot')(Botkit);
//var hangoutbot        = ModuleLoader.bot('hangoutsbot')(hangoutsBot);

