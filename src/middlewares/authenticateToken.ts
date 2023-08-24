import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import customResponse from "../customResponse";
import UserRepository from "../repos/UserRepository";
import AuthRepository from "../repos/AuthRepository";

const userRepository = new UserRepository();
const authRepository = new AuthRepository();

interface JwtPayload {
    username: string;
}

export default async function authenticateToken(req: Request & any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
        const user = await userRepository.getUserByUsername(decoded.username);
        const blackListedTokens = (await authRepository.getBlackListedTokens()).map(blt => blt.token);

        if (!user && blackListedTokens.includes(token)) {
            res.status(StatusCodes.UNAUTHORIZED)
                .send(customResponse(StatusCodes.UNAUTHORIZED, "Unauthorized", [], null))        
        } else {
            if (req.auth) {
                req.auth.user = user;
            } else {
                req.auth = {
                    user
                }
            }

            next();
        }
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.UNAUTHORIZED)
            .send(customResponse(StatusCodes.UNAUTHORIZED, "Unauthorized", [], null))
    }


}