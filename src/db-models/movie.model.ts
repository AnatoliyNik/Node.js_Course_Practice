import { model, models, Schema } from "mongoose";
import { modelName, movieValidationMessage } from "../data/constants";
import { Movie } from "../models/movie.model";

const movieSchema: Schema<Movie> = new Schema<Movie>({
    title: {
        type: String,
        required: true,
        maxLength: 300,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000,
        trim: true
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: [{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: async (genre: string): Promise<boolean> => {
                    const count: number = await models[modelName.genre].countDocuments({name: genre});

                    return !!count;
                },
                message: movieValidationMessage.genreDoesNotExist
            }
        }],
        required: true,
        validate: {
            validator: (genre: string[]): boolean => !!genre.length,
            message: movieValidationMessage.emptyArrayOfGenres
        }
    }
}, {
    versionKey: false,
});

export default model(modelName.movie, movieSchema);