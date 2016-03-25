System.register(['angular2/core', 'angular2/http', 'angular2/router', 'angular2-jwt', './../../app.setting', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, angular2_jwt_1, app_setting_1;
    var Note;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (app_setting_1_1) {
                app_setting_1 = app_setting_1_1;
            },
            function (_1) {}],
        execute: function() {
            Note = (function () {
                function Note(http) {
                    var _this = this;
                    var profile = JSON.parse(localStorage.getItem('profile'));
                    var NoteRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/note?email=" + profile.email;
                    http.get(NoteRequestUrl)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.notes = data; }, function (err) { return console.log(err); }, function () { return console.log(_this.notes); });
                }
                Note = __decorate([
                    core_1.Component({
                        selector: 'note',
                        viewProviders: [http_1.HTTP_PROVIDERS]
                    }),
                    core_1.View({
                        templateUrl: './components/note/note.html'
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Note);
                return Note;
            }());
            exports_1("Note", Note);
        }
    }
});
//# sourceMappingURL=note.js.map