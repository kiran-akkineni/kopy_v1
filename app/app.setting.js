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
                    get: function () { return 'http://localhost:5000'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppSettings, "AUTH_CLIRNT_ID", {
                    //public static get API_ENDPOINT(): string { return 'https://bot.ofra.in'; }
                    get: function () { return 'kWSNpHIdfmhITKDVYu9dZ5UB57sQZ6JQ'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppSettings, "AUTH_APP_URL", {
                    get: function () { return 'app47501252.auth0.com'; },
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