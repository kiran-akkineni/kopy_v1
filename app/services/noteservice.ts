import {Injectable}                            from 'angular2/core';
import {Http, Headers}                         from 'angular2/http'
import {AppSettings} 			               from '../app.setting';

@Injectable()
export class NoteService {

    private http: Http;

    constructor(http:Http) {
      this.http = http;
    }

    get() {
        const token             = localStorage.getItem('token');
		var NoteRequestUrl  = AppSettings.API_ENDPOINT + "/note?token=" +token;
        return new Promise((resolve, reject) => {
            this.http.get(NoteRequestUrl)
		             .map(data => data.json())
      		         .subscribe(data	 => resolve(data),
        		                err 	 => reject(err));
        });
    }

    getCSV() {
        const token         = localStorage.getItem('token');
         window.location.href=AppSettings.API_ENDPOINT + "/note/export_csv?token=" +token;
    }

    save(data) {
        const token     = localStorage.getItem('token');
        var headers     = new Headers();
        var credentials = 'note='+data.note;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var noteRequestUrl  = AppSettings.API_ENDPOINT + "/note?token=" +token;

        return new Promise((resolve, reject) => {
            this.http.post(noteRequestUrl, credentials, {headers: headers})
                     .map(data => data.json())
      		         .subscribe(data	 => resolve(data),
        		        	    err 	 => reject(err));
        })
    }
}