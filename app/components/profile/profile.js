System.register(['angular2/core', 'angular2/router', 'angular2-jwt'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, angular2_jwt_2;
    var Profile;
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
                angular2_jwt_2 = angular2_jwt_1_1;
            }],
        execute: function() {
            Profile = (function () {
                function Profile(authHttp) {
                    this.authHttp = authHttp;
                    this.profile = JSON.parse(localStorage.getItem('profile'));
                }
                Profile = __decorate([
                    core_1.Component({
                        selector: 'profile'
                    }),
                    core_1.View({
                        templateUrl: './components/profile/profile.html'
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [angular2_jwt_2.AuthHttp])
                ], Profile);
                return Profile;
            })();
            exports_1("Profile", Profile);
        }
    }
});
//# sourceMappingURL=profile.js.map