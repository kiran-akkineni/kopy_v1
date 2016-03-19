System.register(['./../../app.setting', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_setting_1, http_1;
    var User;
    return {
        setters:[
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            User = (function () {
                function User() {
                }
                User.prototype.saveUser = function (http, profile) {
                    var _this = this;
                    console.log(profile);
                    var creds = "email=" + profile.profile + "&name=" + profile.name + "&user_id=" + profile.user_id;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var userRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/user";
                    http.post(userRequestUrl, creds, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { data = _this.data; }, function (err) { return console.log(err); }, function () { return console.log('Authentication Complete'); });
                };
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map