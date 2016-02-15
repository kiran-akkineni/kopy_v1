"use strict";

var Botkit  = require('botkit');
var pg      = require('pg');
var util    = require('util');


var clientId      = process.env.CLIENT_ID     || '19936248482.21489538647';
var clientSecret  = process.env.CLIENT_SECRET || 'c71c603cf8fce0c4d840ad9ca794c9c3';
var port          = process.env.PORT          || 5000;
var conString     = process.env.DATABASE_URL  || 'postgres://vagrant@localhost:5432/vagrant';

//db migrating
dbMigrate();

//debug mode set to false
var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.configureSlackApp({
    clientId      : clientId,
    clientSecret  : clientSecret,
    redirect_uri  : 'https://kopychat.heroku.com/connect',
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

  webserver.get('/connect',function(req,res) {
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
          convo.say('kopychat joined your team');
          convo.say('/invite kopychat to channels in which you plan to use it!');
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
    kopy(data);
  });

  bot.reply(message,'Your message has been saved. Thank you.')
});

controller.on('slash_command', function(bot,message) {
  var data = {};

  data.user_id          = message.user_id;
  data.message          = message.text;
  data.app_name         = 'slack';
  data.app_user_name    = message.user_name;
  data.app_group_name   = message.team_domain;


  bot.replyPublic(message, 'Your message has been saved. Thank you.');
  kopy(data);
});


function kopy(data) {

  var queryString = util.format("INSERT INTO messages (user_id,message,app_name,app_user_name,app_group_name) VALUES ('%s','%s','%s','%s','%s')",
                                 data.user_id,
                                 data.message,
                                 data.app_name,
                                 data.app_user_name,
                                 data.app_group_name);

    executeQuery(queryString);
}

function dbMigrate() {
    console.log('Migration started ...');

    var query = "CREATE TABLE IF NOT EXISTS messages (ID bigserial PRIMARY KEY, " +
                "user_id VARCHAR(200) null, message TEXT null, app_name VARCHAR(100) null," +
                "app_user_name VARCHAR(100) null, app_group_name VARCHAR(100) null, " +
                "create_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())";

    executeQuery(query);
    console.log('Migration Ended');

}
//DB query function
function executeQuery(queryString) {
    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle conString errors
        if(err) {
          done();
          console.log(err);
          return false;
        }

        // SQL Query > Insert Data
        var query = client.query(queryString);

        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log(row)
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return true;
        });
    });
}