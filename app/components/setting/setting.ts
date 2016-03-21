import {FORM_DIRECTIVES, ControlGroup, Control,}              from 'angular2/common';
import {Component, View}                                      from 'angular2/core';
import {CanActivate}                                          from 'angular2/router';
import {tokenNotExpired}                                      from 'angular2-jwt';
import {Http}                                                 from "angular2/http";

@Component({
	selector: 'setting',
    directives: [FORM_DIRECTIVES]
})
@View({
	templateUrl: './components/setting/setting.html'
})
@CanActivate(() => tokenNotExpired())
export class Setting {
    public http: Http;
    settingForm  = new ControlGroup({
        company_name    : new Control(),
        slack_username  : new Control()});

  constructor(http:Http) {
      this.http = http;
  }
}