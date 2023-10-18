import { RequestHandler } from "express";
import swaggerUI, { JsonObject } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from '../configs/swagger.config';

const swaggerSpecs: JsonObject = swaggerJsDoc(swaggerOptions);
const swagger: Array<RequestHandler[] | RequestHandler> = [swaggerUI.serve, swaggerUI.setup(swaggerSpecs)];

export default swagger;