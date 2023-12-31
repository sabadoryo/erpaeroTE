"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function customResponse(status, message, errors, data) {
    var defaultResponseFields = {
        status: status,
        message: message,
        data: data
    };
    if (errors.length) {
        return __assign(__assign({}, defaultResponseFields), { errors: errors });
    }
    return defaultResponseFields;
}
exports.default = customResponse;
