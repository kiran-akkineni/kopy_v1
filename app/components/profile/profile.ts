import {Component, View}                from 'angular2/core';
import {CanActivate}                    from 'angular2/router';
import {Http}       					from 'angular2/http'
import {tokenNotExpired}                from './../../services/authcheckservice';
import {AppSettings} 	    			from './../../app.setting';

@Component({
	selector: 'profile'
})
@View({
	templateUrl: './components/profile/profile.html',
    styleUrls   : ['./components/profile/profile.css']
})
@CanActivate(() => tokenNotExpired())
export class Profile {
    profile: any;

  constructor(http:Http) {
	     this.profile = [];
		 this.fetch(http);
	 }

	 fetch(client) {
	 	let token = localStorage.getItem('token');

		 var NoteRequestUrl  = AppSettings.API_ENDPOINT + "/profile?token=" +token;
		 client.get(NoteRequestUrl)
		       .map(data => data.json())
      		   .subscribe(data	 => { this.profile = data},
        		    	  err 	 => console.log(err),
                   ()           => console.log(this.profile));
	 }
}