/**
 * @author Eftakhairul Islam <eftakhairul@gmail.com>
 */

'use strict';

var NoteController    = {};
var userNoteModel     = ModuleLoader.model('user_note');
var noteModel         = ModuleLoader.model('note');
    
NoteController.get = function (req, res) {
    
    userNoteModel.findByEmail(req.query.email, function (results) {
        if (results.length > 0) {
            noteModel.find({app_user_name: results[0].app_user_name}, function(notes) {
                res.json(notes);
            })
        } else {
            res.json([]);
        }
    });
};

var exports = module.exports  = NoteController;


