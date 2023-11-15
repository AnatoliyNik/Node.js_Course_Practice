import { Movie } from "../models/movie.model";
import MovieModel from "../db-models/movie.model";
import GenreModel from "../db-models/genre.model";
import { MOVIE_DESCRIPTION_MAX_LENGTH, MOVIE_TITLE_MAX_LENGTH } from "../data/constants";
import { mockGenre, mockMovie } from "./data/mock-data";
import { validateValidationErrorAsync } from "./data/validators/model-validators/async-validation-error.validator";
import { validateSting } from "./data/validators/model-validators/string.validator";

describe('Movie model', () => {
    beforeEach(async () => {
        await MovieModel.deleteMany({});
        await GenreModel.deleteMany({});
        await GenreModel.create(mockGenre);
    });

    it('should trim movie title', () => {
        const mockMovie: Movie = {
            title: '  title with extra spaces  '
        } as Movie;

        validateSting(mockMovie, 'title', MovieModel, 'trim');
    });

    it('should trim movie description', () => {
        const mockMovie: Movie = {
            description: '  description with extra spaces  '
        } as Movie;

        validateSting(mockMovie, 'description', MovieModel, 'trim');
    });

    it('should trim movie\'s genre name', () => {
        const mockMovie: Movie = {
            genre: ['  genre with extra spaces  ']
        } as Movie;

        validateSting(mockMovie, 'genre', MovieModel, 'trim');
    });

    it('should convert movie\'s genre name to lowercase', () => {
        const mockMovie: Movie = {
            genre: ['GENRE NAME UPPERCASE']
        } as Movie;

        validateSting(mockMovie, 'genre', MovieModel, 'toLowerCase');
    });

    it('should throw validation error if movie title is empty', async () => {
        const movie: Movie = {
            ...mockMovie,
            title: ''
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it('should throw validation error if movie description is empty', async () => {
        const movie: Movie = {
            ...mockMovie,
            description: ''
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it('should throw validation error if movie release date is empty', async () => {
        const movie: Partial<Movie> = {
            ...mockMovie,
        };

        delete movie.releaseDate;

        await validateValidationErrorAsync(movie as Movie, MovieModel);
    });

    it('should throw validation error if movie\'s genre name is empty', async () => {
        const movie: Movie = {
            ...mockMovie,
            genre: ['']
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it('should throw validation error if movie\'s genre array is empty', async () => {
        const movie: Movie = {
            ...mockMovie,
            genre: []
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it('should throw validation error if movie\'s genre name does not exist', async () => {
        const movie: Movie = {
            ...mockMovie,
            genre: ['genre that does not exist']
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it(`should throw validation error if movies title is longer than ${MOVIE_TITLE_MAX_LENGTH} characters`, async () => {
        const movie: Movie = {
            ...mockMovie,
            title: 'a'.repeat(MOVIE_TITLE_MAX_LENGTH + 1)
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });

    it(`should throw validation error if movies description is longer than ${MOVIE_DESCRIPTION_MAX_LENGTH} characters`, async () => {
        const movie: Movie = {
            ...mockMovie,
            description: 'a'.repeat(MOVIE_DESCRIPTION_MAX_LENGTH + 1)
        };

        await validateValidationErrorAsync(movie, MovieModel);
    });
});