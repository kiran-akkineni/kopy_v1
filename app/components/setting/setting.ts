import {Component, OnInit}                                    from 'angular2/core';
import {CanActivate}                                          from 'angular2/router';
import {tokenNotExpired}                                      from 'angular2-jwt';
import {Http, Headers}                                        from "angular2/http";
import {Configuration}                                        from './../../models/configuration';
import {AppSettings} 			                              from './../../app.setting';

import 'rxjs/add/operator/map';



@Component({
	selector: 'setting',
    templateUrl: './components/setting/setting.html'
})

@CanActivate(() => tokenNotExpired())
export class Setting implements OnInit
{
    data;
    configuration: Configuration;
    public http: Http;

    constructor(http:Http) {
      this.http = http;
    }

    ngOnInit() {
        this.configuration = {company_name:"", slack_username:""};
    }

    onSubmit(){
        let profile = JSON.parse(localStorage.getItem('profile'));
        var creds = "email=" + profile.email + "&app_group_name=" + this.configuration.company_name+"&app_user_name=" +this.configuration.slack_username;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var userRequestUrl  = AppSettings.API_ENDPOINT + "/user_note_map";

        this.http.post(userRequestUrl, creds, {headers: headers})
                 .map(res => res.json())
                 .subscribe(
                  data => {data = this.data},
                  err => console.log(err),
                  () => console.log('mapping is done')
                 );

        //redirect note page
        //this.router.navigate(['Note']);
    }
}