"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = __importDefault(require("../prisma"));
var TaskRepository = /** @class */ (function () {
    function TaskRepository() {
    }
    TaskRepository.prototype.createTask = function (title, description, status) {
        return prisma_1.default.task.create({
            data: {
                title: title,
                description: description,
                status: status
            }
        });
    };
    TaskRepository.prototype.editTask = function (id, title, description, status) {
        return prisma_1.default.task.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                status: status
            }
        });
    };
    TaskRepository.prototype.findTaskById = function (id) {
        return prisma_1.default.task.findFirst({
            where: {
                id: id
            },
            include: {
                tags: true
            }
        });
    };
    TaskRepository.prototype.getAllTasks = function () {
        return prisma_1.default.task.findMany({
            include: {
                tags: true
            }
        });
    };
    TaskRepository.prototype.deleteTaskById = function (id) {
        return prisma_1.default.task.delete({
            where: {
                id: id
            }
        });
    };
    return TaskRepository;
}());
exports.default = TaskRepository;
