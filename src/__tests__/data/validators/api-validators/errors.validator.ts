import { validateInternalServerError } from "./internal-server-error.validator";
import { validateBadIdError } from "./bad-id-error.validator";
import { validateNotFoundError } from "./not-found-error.validator";
import { url as path } from "../../../../data/constants";
import { validateBadRequestError } from "./bad-request-error.validator";
import { Action } from "../../../../models/action.model";
import { ModelName } from "../../../../models/model-name.model";
import { mockGenre } from "../../mock-data";

export function validateErrors(action: Action, name: ModelName): void {
    const url = name === 'genre' ? path.genres : path.movies;
    const fakeObjectId = '1'.repeat(24);
    const notObjectId = 'some string';
    const notExistingGenreName = 'not existing genre name';
    const existingGenreName = mockGenre.name;

    switch (action) {
        case 'get':
            validateInternalServerError('get', name, url);
            break;
        case 'getById':
            validateNotFoundError('get', name, `${url}/${fakeObjectId}`);
            validateBadIdError('get', name, `${url}/${notObjectId}`);
            validateInternalServerError('get', name, `${url}/${fakeObjectId}`);
            break;
        case 'getMoviesByGenre':
            const message = 'should return status code 404 if there is no genre with such name';
            validateNotFoundError('get', name, `${url}/genre/${notExistingGenreName}`, message);
            validateInternalServerError('get', name, `${url}/genre/${existingGenreName}`);
            break;
        case 'post':
            validateBadRequestError('post', name, url);
            validateInternalServerError('post', name, url);
            break;
        case 'put':
            validateBadRequestError('put', name, `${url}/${fakeObjectId}`);
            validateNotFoundError('put', name, `${url}/${fakeObjectId}`);
            validateBadIdError('put', name, `${url}/${notObjectId}`);
            validateInternalServerError('put', name, `${url}/${fakeObjectId}`);
            break;
        case 'delete':
            validateNotFoundError('delete', name, `${url}/${fakeObjectId}`);
            validateBadIdError('delete', name, `${url}/${notObjectId}`);
            validateInternalServerError('delete', name, `${url}/${fakeObjectId}`);
            break;
    }
}
