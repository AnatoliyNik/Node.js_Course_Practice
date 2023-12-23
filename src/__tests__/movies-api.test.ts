import request from "supertest";
import app from "../index";
import MovieModel from "../db-models/movie.model";
import { mockGenre, mockMovie } from "./data/mock-data";
import { response, url } from "../data/constants";
import GenreModel from "../db-models/genre.model";
import { validateErrors } from "./data/validators/api-validators/errors.validator";
import { Movie } from "../models/movie.model";
import { validateMovie } from "./data/validators/api-validators/movie.validator";

const moviesUrl: string = url.movies;

describe('Movies API', () => {

    beforeEach(async () => {
        await MovieModel.deleteMany({});
        await GenreModel.deleteMany({});
        await GenreModel.create(mockGenre);
    });

    describe('GET /movies', () => {
        it('should get all movies', async () => {
            await MovieModel.create(mockMovie);

            const res: request.Response = await request(app).get(moviesUrl);

            expect(res.status).toBe(response.ok.code);
            expect(res.body.length).toEqual(1);
        });

        it('should get empty array if there are no movies', async () => {
            const res: request.Response = await request(app).get(moviesUrl);

            expect(res.status).toBe(response.ok.code);
            expect(res.body).toEqual([]);
        });

        validateErrors('get', 'movie');
    });

    describe('GET /movies/:id', () => {
        it('should get single movie by id', async () => {
            const {id} = await MovieModel.create(mockMovie);
            const res: request.Response = await request(app).get(`${moviesUrl}/${id}`);

            expect(res.body._id).toBe(id);
            expect(res.status).toBe(response.ok.code);

            validateMovie(res.body, mockMovie);
        });

        validateErrors('getById', 'movie');
    });

    describe('GET /movies/genre/:genreName', () => {
        it('should return movies by genreName', async () => {
            await MovieModel.create(mockMovie);
            const res: request.Response = await request(app).get(`${moviesUrl}/genre/${mockGenre.name}`);

            expect(res.status).toBe(response.ok.code);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toEqual(1);

            validateMovie(res.body[0], mockMovie);
        });

        it('should return empty array if there are no movies', async () => {
            const res: request.Response = await request(app).get(`${moviesUrl}/genre/${mockGenre.name}`);

            expect(res.status).toBe(response.ok.code);
            expect(res.body).toEqual([]);
        });

        validateErrors('getMoviesByGenre', 'movie');
    });

    describe('POST /movies', () => {
        it('should create a new movie', async () => {
            const res: request.Response = await request(app).post(moviesUrl).send(mockMovie);

            expect(res.status).toBe(response.ok.code);

            validateMovie(res.body, mockMovie);
        });

        it('should automatically add "_id" property', async () => {
            const res: request.Response = await request(app).post(moviesUrl).send(mockMovie);

            expect(res.body).toHaveProperty('_id');
        });

        validateErrors('post', 'movie');
    });

    describe('PUT /movies/:id', () => {
        it('should change existing movie', async () => {
            const newMovie: Movie = {
                ...mockMovie,
                title: 'New Movie Title',
                description: 'New Description',
                releaseDate: new Date(),
            };

            const {id} = await MovieModel.create(mockMovie);
            const res: request.Response = await request(app).put(`${moviesUrl}/${id}`).send(newMovie);

            expect(res.status).toBe(response.ok.code);

            validateMovie(res.body, newMovie);
        });

        validateErrors('put', 'movie');
    });

    describe('DELETE /movies/:id', () => {
        it('should delete movie by id', async () => {
            const {id} = await MovieModel.create(mockMovie);
            const res: request.Response = await request(app).delete(`${moviesUrl}/${id}`);

            expect(res.status).toBe(response.ok.code);
        });

        validateErrors('delete', 'movie');
    });
});