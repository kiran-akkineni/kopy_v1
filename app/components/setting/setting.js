System.register(['angular2/core', 'angular2/router', '../../services/authcheckservice', '../../services/profileservice', "angular2/common", 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, router_1, authcheckservice_1, profileservice_1, common_1;
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
            function (profileservice_1_1) {
                profileservice_1 = profileservice_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_1) {}],
        execute: function() {
            Setting = (function () {
                function Setting(fromBuilder, profileService) {
                    this.fromBuilder = fromBuilder;
                    this.profileService = profileService;
                }
                Setting.prototype.ngOnInit = function () {
                    var _this = this;
                    this.usernameFrom = this.fromBuilder.group({ username: ["", common_1.Validators.required] });
                    this.profileService.get()
                        .then(function (data) {
                        if (data && data.username)
                            _this.usernameFrom.controls.username.updateValue(data.username);
                    });
                };
                Setting.prototype.saveUserName = function (event) {
                    event.preventDefault();
                };
                Setting = __decorate([
                    core_1.Component({
                        selector: 'setting',
                        providers: [profileservice_1.ProfileService, common_1.Validators],
                        templateUrl: './components/setting/setting.html'
                    }),
                    router_1.CanActivate(function () { return authcheckservice_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, profileservice_1.ProfileService])
                ], Setting);
                return Setting;
            }());
            exports_1("Setting", Setting);
        }
    }
});
//# sourceMappingURL=setting.js.map