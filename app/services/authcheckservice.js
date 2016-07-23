System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tokenNotExpired() {
        if (localStorage.getItem('token') === null) {
            return false;
        }
        return true;
    }
    exports_1("tokenNotExpired", tokenNotExpired);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=authcheckservice.js.map