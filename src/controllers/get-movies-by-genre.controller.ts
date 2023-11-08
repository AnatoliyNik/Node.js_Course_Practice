import { NextFunction, Request, Response } from "express";
import MovieModel from "../db-models/movie.model";
import GenreModel from "../db-models/genre.model";
import { Movie } from "../models/movie.model";
import { Genre } from "../models/genre.model";
import { errorName } from "../data/constants";

export default async function getMoviesByGenre(req: Request, res: Response, next: NextFunction): Promise<void> {
    const genreName: string = req.params.genreName.toLowerCase().trim();

    try {
        const genre: Genre | null = await GenreModel.findOne({name: genreName}).lean();

        if (!genre) {
            const error: Error = new Error(`Genre "${genreName}" does not exist in the database`);
            error.name = errorName.notFoundError;

            return next(error);
        }

        const movies: Movie[] = await MovieModel.find({genre: {$in: genreName}}).lean();

        res.send(movies);
    } catch (err) {
        next(err);
    }
}