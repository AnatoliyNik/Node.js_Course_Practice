import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";
import { response } from "../data/constants";

export default function remove<T>(model: Model<T>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<unknown> {
        const id: string = req.params.id;

        try {
            const query: T | null = await model.findByIdAndDelete(id);

            if (!query) {
                return res.status(response.notFound.code).send(response.notFound);
            }

            res.status(response.ok.code).send(response.ok);
        } catch (err) {
            next(err);
        }
    };
}

