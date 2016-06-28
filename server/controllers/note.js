/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var NoteController    = {};
var userNoteModel     = ModuleLoader.model('user_note');
var noteModel         = ModuleLoader.model('note');
var userModel         = ModuleLoader.model('user');
var randomstring      = require("randomstring");

NoteController.post = function (bot, data, cb) {
    //saving bot message
    noteModel(data).save(function () {
      console.log("slack message is saved.");
    });

    userModel.findByUsernameAndAuthType(data.app_user_name, data.app_name)
             .then(function (result) {

                if (result.length == 0) {
                    var user                    = {};
                    user.auth_type              = data.app_name;
                    user.username               = data.app_user_name;
                    user.is_password_created    = true;
                    user.created_at             = new Date();
                    user.password               = randomstring.generate({length: 8, charset: 'alphabetic'});

                    userModel(user).save(function () {
                      console.log("New user and password generated.");


                      //update the reference to note
                      data.user_id =  result._id;

                      //saving bot message
                      noteModel(data).save(function () {
                        console.log("slack message is saved.");
                      });

                      //password generation tigger
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



NoteController.get = function (req, res) {

    userNoteModel.findByEmail(req.query.email, function (results) {
        if (results.length > 0) {
            noteModel.find({app_user_name: results[0].app_user_name}, function(err, notes) {
                res.json(notes);
            });
        } else {
            res.json([]);
        }
    });
};

var exports = module.exports  = NoteController;
