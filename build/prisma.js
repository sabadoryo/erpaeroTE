"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma;
function getPrisma() {
    if (!prisma) {
        prisma = new client_1.PrismaClient();
        return prisma;
    }
    else {
        return prisma;
    }
}
exports.default = getPrisma();
