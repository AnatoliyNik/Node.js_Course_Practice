import { Request, Response } from "express";
import { response } from "../data/constants";

export default (req: Request, res: Response): void => {
    res.status(response.notFound.code).json(response.notFound);
};