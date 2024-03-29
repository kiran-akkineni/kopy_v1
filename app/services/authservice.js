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
    var AuthService;
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
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                }
                AuthService.prototype.processData = function (data) {
                    this.isLoggedin = true;
                };
                AuthService.prototype.authenticate = function (data) {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    var credentials = 'username=' + data.username + '&password=' + data.password;
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var authRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/authenticate";
                    return new Promise(function (resolve) {
                        _this.http.post(authRequestUrl, credentials, { headers: headers }).map(function (response) { return response.json(); }).subscribe(function (response) {
                            console.log(response);
                            if (response.success) {
                                _this.isLoggedin = true;
                                localStorage.setItem('profile', response.profile);
                                localStorage.setItem('token', response.token);
                                resolve(_this.isLoggedin);
                            }
                        });
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=authservice.js.map