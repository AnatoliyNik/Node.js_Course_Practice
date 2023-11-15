import request from 'supertest';
import app from "../index";
import { Genre } from "../models/genre.model";
import GenreModel from "../db-models/genre.model";
import { url } from "../data/constants";
import { response } from "../data/constants";
import { validateErrors } from "./data/validators/api-validators/errors.validator";
import { mockGenre } from "./data/mock-data";

const genresUrl: string = url.genres;

describe('Genres API', () => {

    beforeEach(async () => {
        await GenreModel.deleteMany({});
    });

    describe('GET /genres', () => {
        it('should get all genres', async () => {
            await GenreModel.create(mockGenre);

            const res: request.Response = await request(app).get(genresUrl);

            expect(res.status).toBe(response.ok.code);
            expect(res.body.length).toEqual(1);
        });

        it('should get empty array if there are no genres', async () => {
            const res: request.Response = await request(app).get(genresUrl);

            expect(res.status).toBe(response.ok.code);
            expect(res.body).toEqual([]);
        });

        validateErrors('get', 'genre');
    });

    describe('GET /genres/:id', () => {
        it('should get single genre by id', async () => {
            const {id} = await GenreModel.create(mockGenre);
            const res: request.Response = await request(app).get(`${genresUrl}/${id}`);

            expect(res.status).toBe(response.ok.code);
            expect(res.body.name).toBe(mockGenre.name.trim().toLowerCase());
            expect(res.body._id).toBe(id);
        });

        validateErrors('getById', 'genre');
    });

    describe('POST /genres', () => {
        it('should create a new genre', async () => {
            const res: request.Response = await request(app).post(genresUrl).send(mockGenre);

            expect(res.status).toBe(response.ok.code);
            expect(res.body.name).toBe(mockGenre.name.trim().toLowerCase());
        });

        it('should automatically add "_id" property', async () => {
            const res: request.Response = await request(app).post(genresUrl).send(mockGenre);

            expect(res.body).toHaveProperty('_id');
        });

        validateErrors('post', 'genre');
    });

    describe('PUT /genres/:id', () => {
        it('should change existing genre', async () => {
            const newGenre: Genre = {
                name: 'New Genre'
            };

            const {id} = await GenreModel.create(mockGenre);
            const res: request.Response = await request(app).put(`${genresUrl}/${id}`).send(newGenre);

            expect(res.status).toBe(response.ok.code);
            expect(res.body.name).toBe(newGenre.name.trim().toLowerCase());
        });

        validateErrors('put', 'genre');
    });

    describe('DELETE /genres/:id', () => {
        it('should delete genre by id', async () => {
            const {id} = await GenreModel.create(mockGenre);
            const res: request.Response = await request(app).delete(`${genresUrl}/${id}`);

            expect(res.status).toBe(response.ok.code);
        });

        validateErrors('delete', 'genre');
    });
});
