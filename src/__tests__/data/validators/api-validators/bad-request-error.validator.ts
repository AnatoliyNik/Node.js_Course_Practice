import GenreModel from "../../../../db-models/genre.model";
import MovieModel from "../../../../db-models/movie.model";
import { validateStatusCode } from "./status-code.validator";
import { errorName, response } from "../../../../data/constants";
import { ModelName } from "../../../../models/model-name.model";
import { RequestMethod } from "../../../../models/request-method.model";

export function validateBadRequestError(method: RequestMethod, name: ModelName, url: string): void {
    const methodForSpying = {
        post: ['create'],
        put: ['findByIdAndUpdate'],
    } as const;

    if (method === 'get' || method === 'delete') {
        return;
    }

    const model = name === 'genre' ? GenreModel : MovieModel;

    it(`should return status code 400 if ${name} model throws validation error`, async () => {
        methodForSpying[method].forEach((method) => {
            jest.spyOn(model, method).mockImplementation(() => {
                const error = new Error();
                error.name = errorName.validationError;

                throw error;
            });
        });

        await validateStatusCode(method, url, {}, response.badRequest.code);
    });
}