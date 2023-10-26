import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";

export default function create<T>(model: Model<T>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data: T = req.body;

            const createdData: T = await model.create(data);

            res.send(createdData);
        } catch (err) {
            next(err);
        }
    };
}
