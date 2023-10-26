import { NextFunction, Request, Response } from "express";
import MovieModel from "../db-models/movie.model";
import GenreModel from "../db-models/genre.model";
import { Movie } from "../models/movie.model";
import { Genre } from "../models/genre.model";

export default async function getMoviesByGenre(req: Request, res: Response, next: NextFunction): Promise<void> {
    const genreName: string = req.params.genreName.toLowerCase().trim();

    try {
        const genre: Genre | null = await GenreModel.findOne({name: genreName}).lean();

        if (!genre) {
            return next(new Error(`Genre "${genreName}" not found in the database`));
        }

        const movies: Movie[] = await MovieModel.find({genre: {$in: genreName}}).lean();

        res.send(movies);
    } catch (err) {
        next(err);
    }
}