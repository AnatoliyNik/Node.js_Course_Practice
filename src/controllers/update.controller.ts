import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model, QueryOptions } from "mongoose";
import { response } from "../data/constants";

export default function update<T extends object>(model: Model<T>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction): Promise<unknown> {
        const id: string = req.params.id;
        const updateOptions: QueryOptions = {
            new: true,
            runValidators: true
        };

        try {
            const data: T = req.body;

            const changedData: T | null = await model.findByIdAndUpdate(id, data, updateOptions).lean();

            if (!changedData) {
                return res.status(response.notFound.code).send(response.notFound);
            }

            res.send(changedData);
        } catch (err) {
            next(err);
        }
    };
}