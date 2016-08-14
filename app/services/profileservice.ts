import {Injectable}                            from 'angular2/core';
import {Http, Headers}                         from 'angular2/http'
import {AppSettings} 			               from '../app.setting';

@Injectable()
export class ProfileService {

    private http: Http;

    constructor(http:Http) {
      this.http = http;
    }

    get() {
        const token             = localStorage.getItem('token');
		const NoteRequestUrl    = AppSettings.API_ENDPOINT + "/profile?token=" +token;
        return new Promise((resolve, reject) => {
            this.http.get(NoteRequestUrl)
		          .map(data => data.json())
      		      .subscribe(data	 => resolve(data),
        		    	     err 	 => reject(err));
        });
    }

    save(data) {
        var headers     = new Headers();
        var credentials = 'username='+data.username;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var profileRequestUrl  = AppSettings.API_ENDPOINT + "/profile";

        return new Promise((resolve) => {
            this.http.post(profileRequestUrl, credentials, {headers: headers})
                     .map(response => response.json())
                     .subscribe((response) => {
                        console.log(response);
                        if (response.success) {
                            resolve(response);
                        }
                     })
        })
    }
}