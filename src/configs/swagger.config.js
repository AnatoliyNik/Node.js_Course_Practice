const {server: {url}} = require('../data/constants');

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            definition: 'Express application API'
        },
        servers: [{url}]
    },
    apis: ['src/routes/*.js']
}

module.exports = swaggerConfig;