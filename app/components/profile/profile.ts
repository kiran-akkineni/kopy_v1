import {Component, View}                from 'angular2/core';
import {CanActivate}                    from 'angular2/router';
import {tokenNotExpired}                from './../../services/authcheckservice';

@Component({
	selector: 'profile'
})
@View({
	templateUrl: './components/profile/profile.html'
})
@CanActivate(() => tokenNotExpired())
export class Profile {
    profile: any;

  constructor() {
  }
}