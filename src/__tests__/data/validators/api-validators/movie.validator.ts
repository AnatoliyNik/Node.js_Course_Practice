import { Movie } from "../../../../models/movie.model";

export function validateMovie(responseData: Movie, movie: Movie): void {
    expect(responseData.title).toBe(movie.title.trim());
    expect(responseData.description).toBe(movie.description.trim());
    expect(responseData.genre[0]).toBe(movie.genre[0].trim().toLowerCase());
    expect(responseData.genre.length).toBe(movie.genre.length);
    expect(new Date(responseData.releaseDate)).toEqual(movie.releaseDate);
}