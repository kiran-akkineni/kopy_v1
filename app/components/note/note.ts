import {Component, View}  		  				from 'angular2/core';
import {Http, HTTP_PROVIDERS} 					from 'angular2/http'
import {CanActivate,RouterLink, RouterOutlet} 	from 'angular2/router';

import {tokenNotExpired} 						from 'angular2-jwt';
import {AppSettings} 							from './../../app.setting';

import 'rxjs/add/operator/map';

@Component({
	selector: 'note',
	viewProviders: [HTTP_PROVIDERS]
})
@View({
	templateUrl: './components/note/note.html',
	directives: [RouterOutlet, RouterLink]
})

@CanActivate(() => tokenNotExpired())
export class Note {
	public notes;

	 constructor(http:Http) {
		 let profile = JSON.parse(localStorage.getItem('profile'));

		 var NoteRequestUrl  = AppSettings.API_ENDPOINT + "/note?email=" +profile.email;
		 http.get(NoteRequestUrl)
		     .map(res => res.json())
      		 .subscribe(
        		data	 => { this.notes = data},
        		err 	 => console.log(err),
        		() 		 => console.log(this.notes));
	 }
}