System.register(['angular2/core', 'angular2/http', 'angular2/router', "angular2/common", '../../services/authcheckservice', '../../services/noteservice', "angular2/src/http/headers", 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, common_1, authcheckservice_1, noteservice_1, headers_1;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (authcheckservice_1_1) {
                authcheckservice_1 = authcheckservice_1_1;
            },
            function (noteservice_1_1) {
                noteservice_1 = noteservice_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (_1) {}],
        execute: function() {
            Note = (function () {
                function Note(noteService, fromBuilder) {
                    this.noteService = noteService;
                    this.fromBuilder = fromBuilder;
                    this.flashMessage = { "mgs": "",
                        "type": "success" };
                }
                Note.prototype.ngOnInit = function () {
                    var _this = this;
                    this.notes = [];
                    this.addNoteFrom = this.fromBuilder.group({ note: ["", common_1.Validators.required] });
                    this.noteService.get().then(function (notes) { return _this.notes = notes; });
                };
                Note.prototype.exportCSV = function () {
                    var headers = new headers_1.Headers();
                    headers.append('responseType', 'arraybuffer');
                    this.noteService.getCSV().map(function (res) { return new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); })
                        .subscribe(function (data) { return window.open(window.URL.createObjectURL(data)); }, function (error) { return console.log("Error downloading the file."); }, function () { return console.log('Completed file download.'); });
                };
                Note.prototype.setFlashMessage = function (mgs, type) {
                    if (type === void 0) { type = "success"; }
                    this.flashMessage.mgs = mgs;
                    this.flashMessage.type = "alert alert-" + type;
                };
                Note = __decorate([
                    core_1.Component({
                        selector: 'note',
                        viewProviders: [http_1.HTTP_PROVIDERS],
                        providers: [noteservice_1.NoteService],
                    }),
                    core_1.View({
                        templateUrl: './components/note/note.html',
                        directives: [router_1.RouterOutlet, router_1.RouterLink],
                        styleUrls: ['./components/note/note.css']
                    }),
                    router_1.CanActivate(function () { return authcheckservice_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [noteservice_1.NoteService, common_1.FormBuilder])
                ], Note);
                return Note;
            }());
            exports_1("Note", Note);
        }
    }
});
//# sourceMappingURL=note.js.map