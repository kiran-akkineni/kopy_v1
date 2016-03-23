import {Component, View, bind}                      from 'angular2/core';
import {Router, ROUTER_PROVIDERS, RouterOutlet,
        RouteConfig, RouterLink, Location}          from 'angular2/router';
import {tokenNotExpired, JwtHelper}                 from 'angular2-jwt';
import {LocationStrategy, HashLocationStrategy}     from 'angular2/router';
import {Http, Headers, HTTP_PROVIDERS}              from 'angular2/http';

import { Home }                                     from './components/home/home';
import { Profile }                                  from './components/profile/profile';
import { Note }                                     from './components/note/note';
import { App }                                      from './components/app/app';
import { User }                                     from './components/user/user';
import { Setting }                                  from './components/setting/setting';
import { AppSettings } 					            from './app.setting';

import 'rxjs/add/operator/map';

declare var Auth0Lock;

@Component({
	 selector: 'kopy-app'
})
@View({
	templateUrl: './layout.html',
	directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
     { path: '/',           name: 'Home',    component: Home, useAsDefault: true},
     { path: '/note',       name: 'Note',    component: Note},
     { path: '/app',        name: 'App',     component: App},
     { path: '/profile',    name: 'Profile', component: Profile},
     { path: '/setting',    name: 'Setting', component: Setting}
])

export class AppComponent {
    lock                 = new  Auth0Lock(AppSettings.AUTH_CLIRNT_ID,
                                          AppSettings.AUTH_APP_URL);

    user                 = new User();
    jwtHelper: JwtHelper = new JwtHelper();

    location: Location;

    constructor(location: Location, public http: Http, private router: Router) {
            this.location = location;
    }


    login() {
      var self = this;
      this.lock.show((err: string, profile: string, id_token: string) => {
        if (err) {
          throw new Error(err);
        }
        localStorage.setItem('profile',  JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);


        /*
        console.log(
          this.jwtHelper.decodeToken(id_token),
          this.jwtHelper.getTokenExpirationDate(id_token),
          this.jwtHelper.isTokenExpired(id_token)
        );*/

        self.loggedIn();

        //save into db
        this.user.saveUser(this.http);

        //redirect note page
        this.router.navigate(['Note']);
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