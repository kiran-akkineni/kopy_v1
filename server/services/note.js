/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var NoteService    = {};
var noteModel         = ModuleLoader.model('note');
var userModel         = ModuleLoader.model('user');
var randomstring      = require("randomstring");
var encryptService    = ModuleLoader.service('encrypt');
var fields            = ['app_name', 'app_user_name', 'message', 'created_at'];


//Save note with generate password for user if user and password doesn't exits
NoteService.save = function (data, cb) {

    userModel.findByUsernameAndAuthType(data.app_user_name, data.app_name)
             .then(function (result) {

                if (_.isEmpty(result)) {
                    var user                    = {};
                    user.auth_type              = data.app_name;
                    user.username               = (_.isEmpty(data.app_user_email))? data.app_user_name:data.app_user_email;  //if you have email address, the auth username is your email
                    user.is_password_created    = true;
                    user.created_at             = new Date();
                    var password                = randomstring.generate({length: 8, charset: 'alphabetic'});
                    user.password               = encryptService.encrypt(password.trim());

                    if(data.app_user_email)     user.email      = data.app_user_email;
                    if(data.app_user_fullname)  user.name       = data.app_user_fullname;
                    if(data.app_user_avater)    user.thumnil    = data.app_user_avater;

                    userModel(user).save(function (err, result) {
                      //update the reference to note
                      data.user_id =  result._id;

                      //saving bot message
                      noteModel(data).save(function () {
                        console.log("slack message is saved.");
                      });

                      //updating the password
                      user.password   = password.trim();

                      //password generation trigger
                      cb(user);
                    });
                } else {
                    //update the reference to note
                     data.user_id =  result._id;

                     //saving bot message
                     noteModel(data).save(function () {
                       console.log("slack message is saved.");
                     });
                    cb(false);
                }
            });

};


//Return all note based on Auth User
NoteService.getByAuthUser = function (req, res) {

    if ('token' in req.query) {
        userModel.findOne({token: req.query.token})
            .then(function (result) {
                if (result.length === 0) {
                    res.json([]);
                } else {
                    noteModel.find({user_id: result._id}, function (err, notes) {
                        res.json(notes);
                    });
                }
            });
    } else {
        res.json([]);
    }
};

NoteService.exportCSVByAuthUser = function (req, res) {
    if ('token' in req.query) {
        userModel.findOne({token: req.query.token})
            .then(function (result) {
                if (result.length === 0) {
                    res.json([]);
                } else {
                    noteModel.find({user_id: result._id}, function (err, notes) {
                          res.set('Content-Type', 'text/csv');
                          res.attachment('notes.csv');
                          var data;

                          _.each(notes, function(note){
                              data = [note['app_name'], note['app_user_name'], note['message'], note['created_at']].join(",") + "\n";
                              res.write(data);
                          });

                          res.end();
                    });
                }
            });
    } else {
        res.json([]);
    }
};


var exports = module.exports  = NoteService;
