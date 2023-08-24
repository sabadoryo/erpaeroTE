"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = __importDefault(require("../prisma"));
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.createUser = function (username, password) {
        return prisma_1.default.user.create({
            data: {
                username: username,
                password: password
            },
            select: {
                id: true,
                username: true,
                password: false
            }
        });
    };
    UserRepository.prototype.getUserByUsernameOrThrow = function (username) {
        return prisma_1.default.user.findFirstOrThrow({
            where: {
                username: username
            }
        });
    };
    UserRepository.prototype.getUserByUsername = function (username) {
        return prisma_1.default.user.findFirst({
            where: {
                username: username
            }
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;
