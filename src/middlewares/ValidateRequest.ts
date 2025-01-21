import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { HttpValidationExceptions } from "../utils/HttpExceptions";

const ValidateRequest = (validationSchema: z.Schema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            validationSchema.parse(req.body);
            next()
        } catch(err) {
            if (err instanceof ZodError) {
                const errorMessage = err.errors.map((error) => `${error.path.join(".")} is ${error.message.toLocaleLowerCase()}`)
                next(new HttpValidationExceptions(errorMessage))
            }
        }
    }
}

export default ValidateRequest;