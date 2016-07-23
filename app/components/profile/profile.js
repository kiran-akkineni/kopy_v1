System.register(['angular2/core', 'angular2/router', 'angular2/http', '../../services/authcheckservice', '../../app.setting'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, authcheckservice_1, app_setting_1;
    var Profile;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (authcheckservice_1_1) {
                authcheckservice_1 = authcheckservice_1_1;
            },
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            }],
        execute: function() {
            Profile = (function () {
                function Profile(http) {
                    this.profile = [];
                    this.fetch(http);
                }
                Profile.prototype.fetch = function (client) {
                    var _this = this;
                    var token = localStorage.getItem('token');
                    var NoteRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/profile?token=" + token;
                    client.get(NoteRequestUrl)
                        .map(function (data) { return data.json(); })
                        .subscribe(function (data) { _this.profile = data; }, function (err) { return console.log(err); }, function () { return console.log(_this.profile); });
                };
                Profile = __decorate([
                    core_1.Component({
                        selector: 'profile'
                    }),
                    core_1.View({
                        templateUrl: './components/profile/profile.html',
                        styleUrls: ['./components/profile/profile.css']
                    }),
                    router_1.CanActivate(function () { return authcheckservice_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Profile);
                return Profile;
            }());
            exports_1("Profile", Profile);
        }
    }
});
//# sourceMappingURL=profile.js.map