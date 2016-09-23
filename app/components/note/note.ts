import {Component, View, OnInit}  		  		from 'angular2/core';
import {HTTP_PROVIDERS} 						from 'angular2/http'
import {CanActivate,RouterLink, RouterOutlet} 	from 'angular2/router';
import {ControlGroup, FormBuilder, Validators}  from "angular2/common";
import {tokenNotExpired}                        from '../../services/authcheckservice';
import {NoteService}	                        from '../../services/noteservice';
import {Headers}                                from "angular2/src/http/headers";
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

	 exportCSV() {
	      var headers = new Headers();
          headers.append('responseType', 'arraybuffer');
          this.noteService.getCSV().map(res => new Blob([res],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
                                   .subscribe(data => window.open(window.URL.createObjectURL(data)),
                                              error => console.log("Error downloading the file."),
                                              () => console.log('Completed file download.'));
     }

	 setFlashMessage(mgs, type="success") {
        this.flashMessage.mgs       = mgs;
        this.flashMessage.type      = "alert alert-"+type;
    }
}