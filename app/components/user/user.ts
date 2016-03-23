import {AppSettings} 			 from './../../app.setting';
import {Headers}                 from 'angular2/http';
import 'rxjs/add/operator/map';

export class User {
    data;
    saveUser(http) {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var creds = "email=" + profile.email + "&name=" + profile.name+"&user_id=" +profile.user_id;
        var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          var userRequestUrl  = AppSettings.API_ENDPOINT + "/user";

          http.post(userRequestUrl, creds, {headers: headers})
            .map(res => res.json())
            .subscribe(
              data => {data = this.data},
              err => console.log(err),
              () => console.log('Authentication Complete')
           );
    }
}

