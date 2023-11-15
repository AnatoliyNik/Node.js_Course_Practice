import { Genre } from "../../models/genre.model";
import { Movie } from "../../models/movie.model";

export const mockGenre: Genre = {
    name: 'Mock Genre'
};

export const mockMovie: Movie = {
    title: 'Mock Movie',
    description: 'Mock Description',
    genre: [mockGenre.name],
    releaseDate: new Date('2020-01-01')
};