import { Error, Model } from 'mongoose';

export async function validateValidationErrorAsync<T>(data: T, model: Model<T>): Promise<void> {
    let catchBlockExecuted = false;

    try {
        await new model(data).validate();
    } catch (error) {
        catchBlockExecuted = true;
        expect(error).toBeInstanceOf(Error.ValidationError);
    }

    expect(catchBlockExecuted).toBe(true);
}