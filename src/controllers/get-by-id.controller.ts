import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";
import { response } from "../data/constants";

export default function getById<T>(model: Model<T>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<unknown> {
        const id: string = req.params.id;

        try {
            const query: T | null = await model.findById(id).lean();

            if (!query) {
                return res.status(response.notFound.code).send(response.notFound);
            }

            res.send(query);
        } catch (err) {
            next(err);
        }
    };
}

