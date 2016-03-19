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

    save: function(data) {

      var queryString = util.format("INSERT INTO users (auth_user_id,auth_type,email,name) VALUES ('%s','%s','%s','%s')",
                                     data.auth_user_id,
                                     data.auth_type,
                                     data.email,
                                     data.name);

        var self = this;
        self.query(queryString, null);
    },

    findbyEmail: function(email, cb) {
        var queryString = "SELECT * FROM users where email='" + email + "'";
        var self        = this;
        self.query(queryString, cb);
    }
};






