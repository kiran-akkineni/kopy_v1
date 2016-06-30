import {Injectable}                            from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers}         from 'angular2/http'
import {AppSettings} 			               from './../app.setting';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    private http: Http;

    constructor(http:Http) {
      this.http = http;
    }

    processData(data) {
        this.isLoggedin = true;
    }

    authenticate(data) {
        this.isLoggedin = false;
        var headers     = new Headers();
        var credentials = 'username='+data.username+'&password='+data.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var authRequestUrl  = AppSettings.API_ENDPOINT + "/authenticate";

        return new Promise((resolve) => {

            this.http.post(authRequestUrl, credentials, {headers: headers}).subscribe((data) => {



                if (data.json().success) {
                    this.isLoggedin = true;
                    localStorage.setItem('profile',  data.json().profile);
                    localStorage.setItem('token',    data.json().token);
                    resolve(this.isLoggedin);
                }
            })
        })
    }
}