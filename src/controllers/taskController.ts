import express, { Request, Response } from "express";
import validateRequestMiddleware from "../middlewares/validateRequest";
import TaskService from "../services/TaskService";
import { StatusCodes } from "http-status-codes";
import customResponse from "../customResponse";
import CreateTaskRequest from "../requests/TaskRequests/CreateTaskRequest";
import EditTaskRequest from "../requests/TaskRequests/EditTaskRequest";
import authenticateToken from "../middlewares/authenticateToken";
import GetSpecificTaskRequest from "../requests/TaskRequests/GetSpecificTaskRequest";
import DeleteSpecificTaskRequest from "../requests/TaskRequests/DeleteSpecificTaskRequest";

const taskRouter = express.Router();
const taskService = new TaskService();

taskRouter.post("/", authenticateToken, validateRequestMiddleware(CreateTaskRequest), async (req: Request, res: Response) => {
    const taskData = req.body;

    const task = await taskService.createTask(taskData);

    res.status(StatusCodes.CREATED)
        .send(customResponse(StatusCodes.CREATED, "Task created.", [], task))
})

taskRouter.put("/", validateRequestMiddleware(EditTaskRequest), async (req: Request, res: Response) => {
    const taskData = req.body;

    const task = await taskService.editTask(taskData);

    res.status(StatusCodes.ACCEPTED)
        .send(customResponse(StatusCodes.ACCEPTED, "Task edited.", [], task))
})

taskRouter.get("/", authenticateToken, async (req: Request, res: Response) => {
    const tasks = await taskService.getAllTasks();

    res.status(StatusCodes.OK)
        .send(customResponse(StatusCodes.OK, "Tasks found.", [], tasks))
})

taskRouter.get("/:taskId", authenticateToken, validateRequestMiddleware(GetSpecificTaskRequest),async (req: Request, res: Response) => {
    const tasks = await taskService.getTaskById(req.params.taskId);

    res.status(StatusCodes.OK)
        .send(customResponse(StatusCodes.OK, "Task found.", [], tasks))
})

taskRouter.delete("/:taskId", authenticateToken, validateRequestMiddleware(DeleteSpecificTaskRequest),async (req: Request, res: Response) => {
    const tasks = await taskService.deleteTaskById(req.params.taskId);

    res.status(StatusCodes.ACCEPTED)
        .send(customResponse(StatusCodes.ACCEPTED, "Task deleted.", [], tasks))
})


export default taskRouter;