import {Component, OnInit}                                    from 'angular2/core';
import {CanActivate}                                          from 'angular2/router';
import {tokenNotExpired}                                      from 'angular2-jwt';
import {Http}                                                 from "angular2/http";
import {Configuration}                                        from './../../models/configuration';

@Component({
	selector: 'setting',
    templateUrl: './components/setting/setting.html'
})

@CanActivate(() => tokenNotExpired())
export class Setting implements OnInit
{
    configuration: Configuration;
    public http: Http;

    constructor(http:Http) {
      this.http = http;
    }

    ngOnInit() {
        this.configuration = {company_name:"", slack_username:""};
    }

    onSubmit(){
      console.log(this.configuration);
    }
}