import {Component, View, OnInit}  		  		from 'angular2/core';
import {HTTP_PROVIDERS} 						from 'angular2/http'
import {CanActivate,RouterLink, RouterOutlet} 	from 'angular2/router';
import {ControlGroup, FormBuilder, Validators}  from "angular2/common";
import {tokenNotExpired}                        from '../../services/authcheckservice';
import {NoteService}	                        from '../../services/noteservice';

import 'rxjs/add/operator/map';


@Component({
	selector: 'note',
	viewProviders: [HTTP_PROVIDERS],
	providers: [NoteService],
})
@View({
	templateUrl : './components/note/note.html',
	directives  : [RouterOutlet, RouterLink],
	styleUrls   : ['./components/note/note.css']
})

@CanActivate(() => tokenNotExpired())
export class Note implements OnInit{
	public notes;
	public addNoteFrom:ControlGroup;
	public flashMessage = {"mgs" : "",
                           "type": "success"};

	 constructor(private noteService:NoteService, private fromBuilder: FormBuilder) {}

	 ngOnInit() {
	 	this.notes = [];

	 	this.addNoteFrom = this.fromBuilder.group({note: ["", Validators.required]});
		this.noteService.get().then(notes => this.notes = notes);
	 }



	 saveNote(event) {
	 	if (this.addNoteFrom.valid) {
      		this.noteService.save({note: this.addNoteFrom.controls.note.value})
            		        .then((data) => {
                                   if (data.status == false) {
                                       this.setFlashMessage("Somethins went worng","danger");
                                   } else {
                                        this.setFlashMessage("Note has been saved successfully.","success");
                                   }
                               });
    	} else {
    		alert('not valid');
		}
	 }

	 setFlashMessage(mgs, type="success") {
        this.flashMessage.mgs       = mgs;
        this.flashMessage.type      = "alert alert-"+type;
    }
}