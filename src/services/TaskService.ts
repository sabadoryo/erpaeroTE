import TaskRepository from "../repos/TaskRepository";

export default class TaskService {
    taskRepository: TaskRepository

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async createTask(taskData: any) {
        return this.taskRepository.createTask(taskData.title, taskData.description, taskData.status);
    }

    async editTask(taskData: any) {
        return this.taskRepository.editTask(taskData.id, taskData.title, taskData.description, taskData.status);
    }

    async getTaskById(taskId: string) {
        const task = await this.taskRepository.findTaskById(taskId);

        return task;
    }

    async getAllTasks() {
        return this.taskRepository.getAllTasks();
    }

    async deleteTaskById(taskId: string) {
        return this.taskRepository.deleteTaskById(taskId);
    }
}