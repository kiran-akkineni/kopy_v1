import {Component, View, bind} from 'angular2/core';
import {ROUTER_PROVIDERS, RouterOutlet, RouteConfig, RouterLink, Location} from 'angular2/router';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import { Home }     from './components/home/home';
import { Profile }  from './components/profile/profile';
import { Note }     from './components/note/note';

declare var Auth0Lock;

@Component({
	 selector: 'kopy-app'
})
@View({
	templateUrl: './layout.html',
	directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
     { path: '/', name: 'Home',  component: Home, useAsDefault: true},
     { path: '/note', name: 'Note',  component: Note},
     { path: '/profile', name: 'Profile', component: Profile}
])

export class AppComponent {
    lock  = new  Auth0Lock('NP6xIevUidzEWHmBDvBlhzjWlMCibg4l',
                           'kopy.auth0.com');

    jwtHelper: JwtHelper = new JwtHelper();

    location: Location;
    constructor(location: Location) {
            this.location = location;
    }


    login() {
      var self = this;
      this.lock.show((err: string, profile: string, id_token: string) => {
        if (err) {
          throw new Error(err);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);

        console.log(
          this.jwtHelper.decodeToken(id_token),
          this.jwtHelper.getTokenExpirationDate(id_token),
          this.jwtHelper.isTokenExpired(id_token)
        );

        self.loggedIn();
      });
    }

    logout() {
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');

      this.loggedIn();
    }

    loggedIn() {
      return tokenNotExpired();
    }

    isActive(path) {
        return this.location.path() === path;
    }
}