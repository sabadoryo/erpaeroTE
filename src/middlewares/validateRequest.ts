import { NextFunction, Request, Response } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";
import { StatusCodes } from 'http-status-codes';
import customResponse from "../customResponse";

export default function validateRequestMiddleware(validationSchema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await checkSchema(validationSchema).run(req);
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res.status(StatusCodes.IM_A_TEAPOT)
            .send(customResponse(StatusCodes.IM_A_TEAPOT, "Validation Error", errors, null))
        } else {
            next();
        }
    }
}