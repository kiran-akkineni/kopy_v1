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
    var NoteService;
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
            NoteService = (function () {
                function NoteService(http) {
                    this.http = http;
                }
                NoteService.prototype.get = function () {
                    var _this = this;
                    var token = localStorage.getItem('token');
                    var NoteRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/note?token=" + token;
                    return new Promise(function (resolve, reject) {
                        _this.http.get(NoteRequestUrl)
                            .map(function (data) { return data.json(); })
                            .subscribe(function (data) { return resolve(data); }, function (err) { return reject(err); });
                    });
                };
                NoteService.prototype.getCSV = function () {
                    var token = localStorage.getItem('token');
                    window.location.href = app_setting_1.AppSettings.API_ENDPOINT + "/note/export_csv?token=" + token;
                };
                NoteService.prototype.save = function (data) {
                    var _this = this;
                    var token = localStorage.getItem('token');
                    var headers = new http_1.Headers();
                    var credentials = 'note=' + data.note;
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var noteRequestUrl = app_setting_1.AppSettings.API_ENDPOINT + "/note?token=" + token;
                    return new Promise(function (resolve, reject) {
                        _this.http.post(noteRequestUrl, credentials, { headers: headers })
                            .map(function (data) { return data.json(); })
                            .subscribe(function (data) { return resolve(data); }, function (err) { return reject(err); });
                    });
                };
                NoteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], NoteService);
                return NoteService;
            }());
            exports_1("NoteService", NoteService);
        }
    }
});
//# sourceMappingURL=noteservice.js.map