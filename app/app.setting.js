System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppSettings;
    return {
        setters:[],
        execute: function() {
            AppSettings = (function () {
                function AppSettings() {
                }
                Object.defineProperty(AppSettings, "API_ENDPOINT", {
                    //public static get API_ENDPOINT(): string { return 'http://localhost:5000'; }
                    get: function () { return 'https://kopychat.herokuapp.com'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppSettings, "AUTH_CLIRNT_ID", {
                    get: function () { return 'NP6xIevUidzEWHmBDvBlhzjWlMCibg4l'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppSettings, "AUTH_APP_URL", {
                    get: function () { return 'kopy.auth0.com'; },
                    enumerable: true,
                    configurable: true
                });
                return AppSettings;
            }());
            exports_1("AppSettings", AppSettings);
        }
    }
});
//# sourceMappingURL=app.setting.js.map