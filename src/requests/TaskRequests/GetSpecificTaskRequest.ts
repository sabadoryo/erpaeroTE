import TaskService from "../../services/TaskService";

const taskService = new TaskService();

export default {
    taskId: {
        notEmpty: {
            errorMessage: "Id should be provided."
        },
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
    },
}