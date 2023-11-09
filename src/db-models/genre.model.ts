import { Schema, model, models } from "mongoose";
import { genreValidationMessage, modelName } from "../data/constants";
import { Genre } from "../models/genre.model";

const genreSchema: Schema<Genre> = new Schema<Genre>({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true,
        lowercase: true,
        validate: {
            validator: async (name: string): Promise<boolean> => {
                const count: number = await models[modelName.genre].countDocuments({name});

                return !count;
            },
            message: genreValidationMessage.nameAlreadyExists
        }
    }
}, {
    versionKey: false
});

export default model(modelName.genre, genreSchema);