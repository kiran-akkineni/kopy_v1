import {Component, View, Inject}    	from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} 					from 'rxjs/Rx';
import {CanActivate} 					from 'angular2/router';
import {tokenNotExpired} 				from 'angular2-jwt';
import {AppSettings} 					from './../../app.setting';
import 'rxjs/add/operator/map';

@Component({
	selector: 'note',
	viewProviders: [HTTP_PROVIDERS]
})
@View({
	templateUrl: './components/note/note.html'
})

@CanActivate(() => tokenNotExpired())
export class Note {
	public notes;

	 constructor(http:Http) {
		 var NoteRequestUrl  = AppSettings.API_ENDPOINT + "/message/";
		 http.get(NoteRequestUrl)
		     .map((res:Response) => res.json())
      		 .subscribe(
        		data	 => { this.notes = data},
        		err 	 => console.error(err),
        		() 		 => console.log('done'));
	 }
}