import { Status } from "@prisma/client";
import TaskService from "../../services/TaskService";
import TagService from "../../services/TagService";


const taskService = new TaskService();
const tagService = new TagService();

export default {
    id: {
        notEmpty: {
            errorMessage: "Id should be provided."
        },
        custom: {
            errorMessage: "Provided task doesn't exist",
            options: async (tagId: string) => {
                const tag = await tagService.getTagById(tagId);
                
                if (tag) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
        },
    },
    name: {
        notEmpty: {
            errorMessage: "Name should be provided."
        }
    },
    taskId: {    
        custom: {
            errorMessage: "Provided task doesn't exist",
            options: async (taskId: string, { req } : any) => {
                const task = await taskService.getTaskById(taskId);
                
                if (task) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
        },
    }
}