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
var request           = require('request-json');
global._              = require('lodash');
global.client         = request.createClient('https://graph.facebook.com/');


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
Config.page_token     = "EAABz2BdMM9YBAEn9pYZBCqwx6ZC5ZBB4DNJvB2lGDL7HjeRtBcV6ihvEmJS2tHMTF1tDrZBK21ZCHM8jj2QFCsNgO5MDo4HZAUC0uwCnvoiuZAzHSpnwMxRPD2uz1ZBBbbbe07ayGslfC7PuB3fFhUpesFQ6vwOYsGUaCC1xuXmAdwZDZD";

//skype
Config.MS_APP_ID     =  process.env.MS_APP_ID       || '0d6a3d5f-253f-46c4-a4bd-8deaf9d5c873';
Config.MS_APP_SECRET = process.env.MS_APP_SECRET    || 'ioYwL67uEk6KjaseUzqzDL4';




var slackbot          = ModuleLoader.bot('slackbot')(Botkit);
//var hangoutbot        = ModuleLoader.bot('hangoutsbot')(hangoutsBot);

