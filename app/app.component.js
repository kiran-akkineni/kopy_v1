System.register(['angular2/core', 'angular2/router', 'angular2-jwt', 'angular2/http', './components/home/home', './components/profile/profile', './components/note/note', './components/app/app', './components/user/user', './app.setting', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, http_1, home_1, profile_1, note_1, app_1, user_1, app_setting_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (profile_1_1) {
                profile_1 = profile_1_1;
            },
            function (note_1_1) {
                note_1 = note_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(location, http) {
                    this.http = http;
                    this.lock = new Auth0Lock(app_setting_1.AppSettings.AUTH_CLIRNT_ID, app_setting_1.AppSettings.AUTH_APP_URL);
                    this.user = new user_1.User();
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.location = location;
                }
                AppComponent.prototype.login = function () {
                    var _this = this;
                    var self = this;
                    this.lock.show(function (err, profile, id_token) {
                        if (err) {
                            throw new Error(err);
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', id_token);
                        _this.user.saveUser(_this.http, profile);
                        console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token), _this.jwtHelper.isTokenExpired(id_token));
                        self.loggedIn();
                    });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.loggedIn();
                };
                AppComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent.prototype.isActive = function (path) {
                    return this.location.path() === path;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'kopy-app'
                    }),
                    core_1.View({
                        templateUrl: './layout.html',
                        directives: [router_1.RouterOutlet, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_1.Home, useAsDefault: true },
                        { path: '/note', name: 'Note', component: note_1.Note },
                        { path: '/app', name: 'App', component: app_1.App },
                        { path: '/profile', name: 'Profile', component: profile_1.Profile }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Location, http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map