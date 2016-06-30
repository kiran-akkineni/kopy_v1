System.register(['angular2/core', 'angular2/router', './../../services/authcheckservice', "angular2/http", './../../app.setting', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, router_1, authcheckservice_1, http_1, app_setting_1;
    var Setting;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authcheckservice_1_1) {
                authcheckservice_1 = authcheckservice_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            },
            function (_1) {}],
        execute: function() {
            Setting = (function () {
                function Setting(http) {
                    this.http = http;
                }
                Setting.prototype.ngOnInit = function () {
                    var _this = this;
                    var profile = JSON.parse(localStorage.getItem('profile'));
                    this.configuration = { company_name: "", slack_username: "" };
                    var userRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/user_note_map?email=" + profile.email;
                    this.http.get(userRequestUrl)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.data = data; }, function (err) { return console.error(err); }, function () { return _this.getValue(_this.data); });
                };
                Setting.prototype.getValue = function (data) {
                    if (data.length > 0) {
                        this.configuration.company_name = data[0].app_group_name;
                        this.configuration.slack_username = data[0].app_user_name;
                    }
                };
                Setting.prototype.onSubmit = function () {
                    var _this = this;
                    var profile = JSON.parse(localStorage.getItem('profile'));
                    var creds = "email=" + profile.email + "&app_group_name=" + this.configuration.company_name + "&app_user_name=" + this.configuration.slack_username;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var userRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/user_note_map";
                    this.http.post(userRequestUrl, creds, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { data = _this.data; }, function (err) { return console.log(err); }, function () { return console.log('mapping is done'); });
                    //redirect note page
                    //this.router.navigate(['Note']);
                };
                Setting = __decorate([
                    core_1.Component({
                        selector: 'setting',
                        templateUrl: './components/setting/setting.html'
                    }),
                    router_1.CanActivate(function () { return authcheckservice_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Setting);
                return Setting;
            }());
            exports_1("Setting", Setting);
        }
    }
});
//# sourceMappingURL=setting.js.map