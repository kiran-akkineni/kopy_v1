import {Component, View, OnInit}  		  				from 'angular2/core';
import {Http, HTTP_PROVIDERS} 					from 'angular2/http'
import {CanActivate,RouterLink, RouterOutlet} 	from 'angular2/router';
import {ControlGroup, FormBuilder, Validators}                     from "angular2/common";

import {tokenNotExpired}                        from '../../services/authcheckservice';
import {AppSettings} 							from '../../app.setting';
import 'rxjs/add/operator/map';


@Component({
	selector: 'note',
	viewProviders: [HTTP_PROVIDERS]
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

	 constructor(private http:Http, private fromBuilder: FormBuilder) {}


	 ngOnInit() {
	 	this.notes = [];

	 	this.addNoteFrom = this.fromBuilder.group({note: ["", Validators.required]});
		this.fetch();
	 }

	 fetch() {
	 	let token = localStorage.getItem('token');

		 var NoteRequestUrl  = AppSettings.API_ENDPOINT + "/note?token=" +token;
		 this.http.get(NoteRequestUrl)
		          .map(data => data.json())
      		      .subscribe(data	 => { this.notes = data},
        		        	  err 	 => console.log(err));
	 }
}