import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";

export default function getAll<T>(model: Model<T>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query: T[] = await model.find().lean();
            res.send(query);
        } catch (err) {
            next(err);
        }
    };
}

