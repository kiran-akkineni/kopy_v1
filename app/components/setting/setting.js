System.register(['angular2/core', 'angular2/router', 'angular2-jwt', "angular2/http"], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_jwt_1, http_1;
    var Setting;
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
            }],
        execute: function() {
            Setting = (function () {
                function Setting(http) {
                    this.http = http;
                }
                Setting.prototype.ngOnInit = function () {
                    this.configuration = { company_name: "", slack_username: "" };
                };
                Setting.prototype.onSubmit = function () {
                    console.log(this.configuration);
                };
                Setting = __decorate([
                    core_1.Component({
                        selector: 'setting',
                        templateUrl: './components/setting/setting.html'
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Setting);
                return Setting;
            }());
            exports_1("Setting", Setting);
        }
    }
});
//# sourceMappingURL=setting.js.map