import { NextFunction, Request, Response } from "express";
import { response } from "../data/constants";

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(response.internalServerError.code).json(response.internalServerError);
};