import { validateStatusCode } from "./data/validators/api-validators/status-code.validator";
import { response } from "../data/constants";

describe('Other API', () => {
    describe('Get /health-check', () => {
        it('should return status 200', () => {
            validateStatusCode('get', '/health-check', {}, response.ok.code);
        });
    });

    describe('Any not existing route', () => {
        it('should return status 404', () => {
            validateStatusCode('get', '/any-not-existing-route', {}, response.notFound.code);
            validateStatusCode('post', '/any-not-existing-route', {}, response.notFound.code);
            validateStatusCode('put', '/any-not-existing-route', {}, response.notFound.code);
            validateStatusCode('delete', '/any-not-existing-route', {}, response.notFound.code);
        });
    });
});