import { Server } from "../models/server.model";
import { Responses } from "../models/response.model";

export const server: Server = {
    port: process.env.PORT || 3000,
    get url(): string {
        return `http://localhost:${this.port}`;
    }
};

export const response: Responses = {
    ok: {
        code: 200,
        message: 'OK'
    },
    notFound: {
        code: 404,
        message: 'Not Found'
    },
    internalServerError: {
        code: 500,
        message: 'Internal Server Error'
    }
};

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movies-db';

export enum url {
    healthCheck = '/health-check',
    apiDocs = '/api-docs',
    books = '/books',
    movies = '/movies',
    genres = '/genres',
}

export enum modelName {
    genre = 'Genre',
    movie = 'Movie',
}

export enum genreValidationMessage {
    nameAlreadyExists = 'Genre with this name already exists'
}

export enum movieValidationMessage {
    genreDoesNotExist = 'Genre "{VALUE}" does not exist. Please add it to the database first',
    emptyArrayOfGenres = 'Movie must have at least one genre'
}