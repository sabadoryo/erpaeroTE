import express, { Request, Response } from "express";
import CreateUserRequest from "../requests/AuthRequests/CreateUserRequest";
import validateRequestMiddleware from "../middlewares/validateRequest";
import {
    StatusCodes,
} from 'http-status-codes';
import AuthService from "../services/AuthService";
import customResponse from "../customResponse";
import LoginRequest from "../requests/AuthRequests/LoginRequest";
import authenticateToken from "../middlewares/authenticateToken";
import RefreshTokenRequest from "../requests/AuthRequests/RefreshTokenRequest";


const authRouter = express.Router();
const authService = new AuthService();


authRouter.post("/signup", validateRequestMiddleware(CreateUserRequest), async (req: Request, res: Response) => {
    const userData = req.body;

    const user = await authService.register(userData);

    const accessToken = authService.generateAccessToken(user.username);
    const refreshToken = authService.generateRefreshToken(user.username);

    res.status(StatusCodes.CREATED)
        .send(
            customResponse(
                StatusCodes.CREATED, 
                "User created.", 
                [], 
                {
                    user,
                    accessToken,
                    refreshToken
                }
            )
        )
})

authRouter.post("/signin", validateRequestMiddleware(LoginRequest), (req, res) => {
    const userData = req.body;

    const accessToken = authService.generateAccessToken(userData.username);
    const refreshToken = authService.generateRefreshToken(userData.username);

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                {
                    accessToken,
                    refreshToken
                }
            )
        )
})

authRouter.post("/signin/new_token", authenticateToken, validateRequestMiddleware(RefreshTokenRequest), async (req: any, res) => {

    await authService.blackListTokens(req.headers['authorization'], req.body.refresh_token);
    const accessToken = authService.generateAccessToken(req.auth.user.username);
    const refreshToken = authService.generateRefreshToken(req.auth.user.username);

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                {
                    accessToken,
                    refreshToken
                }
            )
        )    
})

export default authRouter;