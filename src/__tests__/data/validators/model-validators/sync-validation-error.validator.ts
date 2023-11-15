import { Error, Model } from "mongoose";

export function validateValidationErrorSync<T>(data: T, model: Model<T>): void {
    const error: Error.ValidationError | null = new model(data).validateSync();

    expect(error).toBeInstanceOf(Error.ValidationError);
}