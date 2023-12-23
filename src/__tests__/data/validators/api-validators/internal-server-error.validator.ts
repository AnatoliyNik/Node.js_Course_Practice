import GenreModel from "../../../../db-models/genre.model";
import MovieModel from "../../../../db-models/movie.model";
import { response } from "../../../../data/constants";
import { validateStatusCode } from "./status-code.validator";
import { RequestMethod } from "../../../../models/request-method.model";
import { ModelName } from "../../../../models/model-name.model";

export function validateInternalServerError(method: RequestMethod, name: ModelName, url: string): void {
    const methodForSpying = {
        get: ['find', 'findById', 'findOne'],
        post: ['create'],
        put: ['findByIdAndUpdate'],
        delete: ['findByIdAndDelete'],
    } as const;

    const model = name === 'genre' ? GenreModel : MovieModel;

    it('should return status code 500 if there is an error', async () => {
        methodForSpying[method].forEach((method) => {
            jest.spyOn(model, method).mockImplementation(() => {
                throw new Error();
            });
        });

        await validateStatusCode(method, url, {}, response.internalServerError.code);
    });
}
