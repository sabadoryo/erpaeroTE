import express, { Request, Response } from "express";
import CreateUserRequest from "../requests/AuthRequests/CreateUserRequest";
import validateRequestMiddleware from "../middlewares/validateRequest";
import {
    StatusCodes,
} from 'http-status-codes';
import AuthService from "../services/AuthService";
import customResponse from "../customResponse";
import LoginRequest from "../requests/AuthRequests/LoginRequest";


const authRouter = express.Router();
const authService = new AuthService();


authRouter.post("/register", validateRequestMiddleware(CreateUserRequest), async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await authService.register(userData);

    res.status(StatusCodes.CREATED)
        .send(customResponse(StatusCodes.CREATED, "User created.", [], user))
})

authRouter.post("/login", validateRequestMiddleware(LoginRequest), (req, res) => {
    const userData = req.body;

    res.status(StatusCodes.CREATED)
        .send(customResponse(StatusCodes.CREATED, "User Found.", [], {"token": ""}))
})

export default authRouter;