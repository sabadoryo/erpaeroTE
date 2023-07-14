import TaskService from "../../services/TaskService";


const taskService = new TaskService();

export default {
    name: {
        notEmpty: {
            errorMessage: "Name should be provided."
        }
    },
    taskId: {    
        notEmpty: {
            errorMessage: "taskId should be provided."
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
    }
}