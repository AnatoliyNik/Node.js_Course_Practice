import { Genre } from "../models/genre.model";
import GenreModel from "../db-models/genre.model";
import { GENRE_NAME_MAX_LENGTH } from "../data/constants";
import { mockGenre } from "./data/mock-data";
import { validateValidationErrorSync } from "./data/validators/model-validators/sync-validation-error.validator";
import { validateSting } from "./data/validators/model-validators/string.validator";
import { validateValidationErrorAsync } from "./data/validators/model-validators/async-validation-error.validator";

describe('Genre model', () => {
    beforeEach(async () => {
        await GenreModel.deleteMany({});
    });

    it('should convert genre name to lowercase', () => {
        const mockGenre: Genre = {
            name: 'UPPERCASE NAME'
        };

       validateSting(mockGenre, 'name', GenreModel, 'toLowerCase');
    });

    it('should trim genre name', async () => {
        const mockGenre: Genre = {
            name: '  name with extra spaces  '
        };

        validateSting(mockGenre, 'name', GenreModel, 'trim');
    });

    it('should throw validation error if genre name is empty', () => {
        const mockGenre: Genre = {
            name: ''
        };

        validateValidationErrorSync(mockGenre, GenreModel);
    });

    it(`should throw validation error if genre name is longer than ${GENRE_NAME_MAX_LENGTH} characters`, () => {
        const mockGenre: Genre = {
            name: 'a'.repeat(GENRE_NAME_MAX_LENGTH + 1)
        };

        validateValidationErrorSync(mockGenre, GenreModel);
    });

    it(`should throw validation error if genre name is already exist`, async () => {
        await GenreModel.create(mockGenre);

        await validateValidationErrorAsync(mockGenre, GenreModel);
    });
});