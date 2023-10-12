import { server } from "../data/constants";
import { Options } from "swagger-jsdoc";

const url: string = server.url;

const swaggerConfig: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Express application API'
        },
        servers: [{url}]
    },
    apis: ['src/routes/*.ts']
};

export default swaggerConfig;