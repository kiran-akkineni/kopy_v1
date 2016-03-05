import {Component, View} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp} from 'angular2-jwt';

@Component({
	selector: 'profile'
})
@View({
	template: `hELLO WORLD`
})
@CanActivate(() => tokenNotExpired())
export class Profile {
    profile: any;

  constructor(public authHttp: AuthHttp) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}