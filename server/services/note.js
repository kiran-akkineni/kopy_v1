/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var NoteService    = {};
var noteModel         = ModuleLoader.model('note');
var userModel         = ModuleLoader.model('user');
var randomstring      = require("randomstring");
var encryptService    = ModuleLoader.service('encrypt');

NoteService.post = function (data, cb) {

    console.log('imside note controller.');

    userModel.findByUsernameAndAuthType(data.app_user_name, data.app_name)
             .then(function (result) {


                if (result.length === 0) {
                    var user                    = {};
                    user.auth_type              = data.app_name;
                    user.username               = data.app_user_name;
                    user.is_password_created    = true;
                    user.created_at             = new Date();
                    var password                = randomstring.generate({length: 8, charset: 'alphabetic'});
                    user.password               = encryptService.encrypt(password);

                    userModel(user).save(function (err, result) {
                      //update the reference to note
                      data.user_id =  result._id;

                      //saving bot message
                      noteModel(data).save(function () {
                        console.log("slack message is saved.");
                      });

                      //updating the password
                      user.password   = password;

                      //password generation trigger
                      cb(user);
                    });
                } else {
                    console.log('else block');
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



NoteService.get = function (req, res) {

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

var exports = module.exports  = NoteService;
