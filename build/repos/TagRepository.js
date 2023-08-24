"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = __importDefault(require("../prisma"));
var TagRepository = /** @class */ (function () {
    function TagRepository() {
    }
    TagRepository.prototype.createTag = function (name, taskId) {
        return prisma_1.default.tag.create({
            data: {
                name: name,
                task_id: taskId
            }
        });
    };
    TagRepository.prototype.editTag = function (id, name, taskId) {
        return prisma_1.default.tag.update({
            where: {
                id: id
            },
            data: {
                name: name,
                task_id: taskId
            }
        });
    };
    TagRepository.prototype.findTagById = function (id) {
        return prisma_1.default.tag.findFirst({
            where: {
                id: id
            },
            include: {
                task: true
            }
        });
    };
    TagRepository.prototype.getAllTags = function () {
        return prisma_1.default.tag.findMany({
            include: {
                task: true
            }
        });
    };
    TagRepository.prototype.deleteTagById = function (id) {
        return prisma_1.default.tag.delete({
            where: {
                id: id
            }
        });
    };
    return TagRepository;
}());
exports.default = TagRepository;
