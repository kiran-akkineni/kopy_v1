System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', './app.component', 'angular2/http', 'angular2-jwt'], function(exports_1) {
    var browser_1, core_1, router_1, app_component_1, http_1, angular2_jwt_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            }],
        execute: function() {
            //enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                core_1.bind(router_1.LocationStrategy).toClass(router_1.HashLocationStrategy),
                core_1.provide(angular2_jwt_1.AuthConfig, { useFactory: function () {
                        return new angular2_jwt_1.AuthConfig();
                    } }),
                angular2_jwt_1.AuthHttp
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map