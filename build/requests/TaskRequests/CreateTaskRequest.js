"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
exports.default = {
    title: {
        notEmpty: {
            errorMessage: "Title should be provided."
        }
    },
    status: {
        isIn: {
            options: [Object.keys(client_1.Status)],
            errorMessage: "Status should be one of: toDo, inProgress, done"
        },
    }
};
