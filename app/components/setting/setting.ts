import { FORM_DIRECTIVES }              from 'angular2/common';
import {Component, View}                from 'angular2/core';
import {CanActivate}                    from 'angular2/router';
import {tokenNotExpired, AuthHttp}      from 'angular2-jwt';

@Component({
	selector: 'setting'
})
@View({
	templateUrl: './components/setting/setting.html'
})
@CanActivate(() => tokenNotExpired())
export class Setting {
    profile: any;

  constructor(public authHttp: AuthHttp) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}