/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

"use strict";

var pg    = require('pg');
var util  = require('util');

module.exports = {

    query: function(queryString, cb) {
        var results = [];

        // Get a Postgres client from the connection pool
        pg.connect(Config.conString, function(err, client, done) {
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
                if(row){
                    results.push(row);
                }
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                if(cb) {
                    cb(results);
                }
                return true;
            });
        });
    },

    savekopy: function(data) {

      var queryString = util.format("INSERT INTO messages (user_id,message,app_name,app_user_name,app_group_name) VALUES ('%s','%s','%s','%s','%s')",
                                     data.user_id,
                                     data.message,
                                     data.app_name,
                                     data.app_user_name,
                                     data.app_group_name);

        var self = this;
        self.query(queryString, null);
    },

    migrate: function() {
        console.log('Migration started ...');

        var self        = this;
        //note table creation
        var queryString = "CREATE TABLE IF NOT EXISTS messages (ID bigserial PRIMARY KEY, " +
                          "user_id VARCHAR(200) null, message TEXT null, app_name VARCHAR(100) null," +
                          "app_user_name VARCHAR(100) null, app_group_name VARCHAR(100) null, " +
                          "create_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())";

        self.query(queryString, null);

        //user table creation
        var queryString = "CREATE TABLE IF NOT EXISTS user (ID bigserial PRIMARY KEY, " +
                          "auth_user_id VARCHAR(200) null, auth_type VARCHAR(100) null, email VARCHAR(200) null," +
                          "name VARCHAR(300) null, create_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())";

        self.query(queryString, null);
        console.log('Migration Ended');
    },

    find: function(cb) {
        var queryString = "SELECT * FROM messages ORDER BY id ASC";
        var self        = this;
        self.query(queryString, cb);
    }
};






