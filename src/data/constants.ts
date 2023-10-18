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

export enum url {
    healthCheck = '/health-check',
    apiDocs = '/api-docs',
    books = '/books',
}