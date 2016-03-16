import {Http, Response, Headers} from 'angular2/http'
import 'rxjs/add/operator/map';

export class User {
    constructor(private http: Http) { }

    saveUser() {
        let jwt = localStorage.getItem('id_token');
        let authHeader = new Headers();
        if(jwt) {
            authHeader.append('Authorization', 'Bearer ' + jwt);
        }

        this.http.get('http://localhost:3001/api/protected/random-quote', {
            headers: authHeader
          })
          .subscribe(
            data => this.secretQuote = data.text(),
            err => this.logError(err.text()),
            () => console.log('Secret Quote Complete')
          );
    }
}

