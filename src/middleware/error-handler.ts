import { NextFunction, Request, Response } from "express";
import { errorName, response } from "../data/constants";

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(err);
    }

    switch (err.name) {
        case errorName.validationError:
            res.status(response.badRequest.code).json({
                ...response.badRequest,
                message: err.message || response.badRequest.message
            });
            break;

        case errorName.notFoundError:
            res.status(response.notFound.code).json({
                ...response.notFound,
                message: err.message || response.notFound.message
            });
            break;

        default:
            res.status(response.internalServerError.code).json({
                ...response.internalServerError,
                message: err.message || response.internalServerError.message
            });
    }
};