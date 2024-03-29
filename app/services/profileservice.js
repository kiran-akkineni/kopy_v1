System.register(['angular2/core', 'angular2/http', '../app.setting'], function(exports_1, context_1) {
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
    var core_1, http_1, app_setting_1;
    var ProfileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            }],
        execute: function() {
            ProfileService = (function () {
                function ProfileService(http) {
                    this.http = http;
                }
                ProfileService.prototype.get = function () {
                    var _this = this;
                    var token = localStorage.getItem('token');
                    var NoteRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/profile?token=" + token;
                    return new Promise(function (resolve, reject) {
                        _this.http.get(NoteRequestUrl)
                            .map(function (data) { return data.json(); })
                            .subscribe(function (data) { return resolve(data); }, function (err) { return reject(err); });
                    });
                };
                ProfileService.prototype.save = function (data) {
                    var _this = this;
                    var token = localStorage.getItem('token');
                    var headers = new http_1.Headers();
                    var credentials = 'username=' + data.username;
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var profileRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/profile/username?token=" + token;
                    return new Promise(function (resolve, reject) {
                        _this.http.put(profileRequestUrl, credentials, { headers: headers })
                            .map(function (data) { return data.json(); })
                            .subscribe(function (data) { return resolve(data); }, function (err) { return reject(err); });
                    });
                };
                ProfileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProfileService);
                return ProfileService;
            }());
            exports_1("ProfileService", ProfileService);
        }
    }
});
//# sourceMappingURL=profileservice.js.map