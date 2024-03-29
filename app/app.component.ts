import {Component, View}                            from 'angular2/core';
import {Router, RouterOutlet,
        RouteConfig, RouterLink, Location}          from 'angular2/router';
import { Home }                                     from './components/home/home';
import { Profile }                                  from './components/profile/profile';
import { Note }                                     from './components/note/note';
import { App }                                      from './components/app/app';
import { Login }                                     from './components/login/login';
import { Setting }                                  from './components/setting/setting';
import {tokenNotExpired}                            from './services/authcheckservice';
import 'rxjs/add/operator/map';

@Component({
	 selector: 'kopy-app'
})
@View({
	templateUrl: './layout.html',
	directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
     { path: '/',           name: 'Home',    component: Home, useAsDefault: true},
     { path: '/login',      name: 'Login',   component: Login },
     { path: '/note',       name: 'Note',    component: Note},
     { path: '/app',        name: 'App',     component: App},
     { path: '/profile',    name: 'Profile', component: Profile},
     { path: '/setting',    name: 'Setting', component: Setting}
])

export class AppComponent {

    location: Location;

    constructor(location: Location, private router:Router) {
            this.location = location;
    }
    
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['Home']);
    }

    loggedIn() {
      return tokenNotExpired();
    }

    isActive(path) {
        return this.location.path() === path;
    }
}