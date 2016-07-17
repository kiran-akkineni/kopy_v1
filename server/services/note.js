/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var NoteService    = {};
var noteModel         = ModuleLoader.model('note');
var userModel         = ModuleLoader.model('user');
var randomstring      = require("randomstring");
var encryptService    = ModuleLoader.service('encrypt');


//Save note with generate password for user if user and password doesn't exits
NoteService.save = function (data, cb) {

    userModel.findByUsernameAndAuthType(data.app_user_name, data.app_name)
             .then(function (result) {


                if (_.isEmpty(result)) {
                    var user                    = {};
                    user.auth_type              = data.app_name;
                    user.username               = data.app_user_name;
                    user.is_password_created    = true;
                    user.created_at             = new Date();
                    var password                = randomstring.generate({length: 8, charset: 'alphabetic'});
                    user.password               = encryptService.encrypt(password.trim());

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

var exports = module.exports  = NoteService;
