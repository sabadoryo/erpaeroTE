import { Status } from "@prisma/client";
import TaskService from "../../services/TaskService";


const taskService = new TaskService();

export default {
    id: {
        notEmpty: {
            errorMessage: "Id should be provided."
        },
        custom: {
            errorMessage: "Provided task doesn't exist",
            options: async (taskId: string) => {
                const task = await taskService.getTaskById(taskId);
                
                if (task) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
        },
    },
    title: {
        notEmpty: {
            errorMessage: "Title should be provided."
        }
    },
    status: {
        isIn: {
            options: [Object.keys(Status)],
            errorMessage: "Status should be one of: toDo, inProgress, done"
        },
    }
}