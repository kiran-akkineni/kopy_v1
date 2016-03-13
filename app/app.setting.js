System.register([], function(exports_1) {
    var AppSettings;
    return {
        setters:[],
        execute: function() {
            AppSettings = (function () {
                function AppSettings() {
                }
                Object.defineProperty(AppSettings, "API_ENDPOINT", {
                    get: function () { return 'https://kopychat.heroku.com'; },
                    enumerable: true,
                    configurable: true
                });
                return AppSettings;
            })();
            exports_1("AppSettings", AppSettings);
        }
    }
});
//# sourceMappingURL=app.setting.js.map