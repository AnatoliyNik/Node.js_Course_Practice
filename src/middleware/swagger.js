const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('../configs/swagger.config');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const swagger = [swaggerUI.serve, swaggerUI.setup(swaggerSpecs)];

module.exports = swagger