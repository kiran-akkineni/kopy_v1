System.register(['angular2/core', 'angular2/router', '../../services/authservice'], function(exports_1, context_1) {
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
    var core_1, router_1, authservice_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authservice_1_1) {
                authservice_1 = authservice_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(authService, router) {
                    this.authService = authService;
                    this.router = router;
                    this.user = { username: '',
                        password: '' };
                }
                Login.prototype.clearField = function () {
                    this.user.username = '';
                    this.user.password = '';
                };
                Login.prototype.onSubmit = function () {
                    var _this = this;
                    this.authService.authenticate(this.user).then(function (res) {
                        if (res) {
                            _this.router.navigate(['Note']);
                        }
                    });
                };
                Login = __decorate([
                    core_1.Component({
                        selector: 'login',
                        providers: [authservice_1.AuthService]
                    }),
                    core_1.View({
                        templateUrl: './components/login/login.html',
                        styleUrls: ["./components/login/login.css"]
                    }), 
                    __metadata('design:paramtypes', [authservice_1.AuthService, router_1.Router])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.js.map