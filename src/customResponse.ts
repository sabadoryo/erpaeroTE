import { ValidationError } from "express-validator";

export default function customResponse(
    status: Number, 
    message: string, 
    errors: ValidationError[], 
    data: any
) {
    const defaultResponseFields = {
        status,
        message,
        data
    }

    if (errors.length) {
        return {
            ...defaultResponseFields,
            errors
        }
    }

    return defaultResponseFields;
}