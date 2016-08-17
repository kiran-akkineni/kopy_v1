/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";
module.exports =  function(server)  {

    // Create chat bot
    var connector = new builder.ChatConnector({appId        : config.MICROSOFT_APP_ID,
                                               appPassword  : config.MICROSOFT_APP_PASSWORD});

    var bot = new builder.UniversalBot(connector);
};