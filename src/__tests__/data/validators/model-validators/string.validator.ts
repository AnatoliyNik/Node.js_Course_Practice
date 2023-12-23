import { HydratedDocument, Model } from "mongoose";

export function validateSting<T, K extends keyof T>(data: T, prop: K, model: Model<T>, method: 'trim' | 'toLowerCase'): void {
    const item: HydratedDocument<T> = new model(data);

    if (typeof data[prop] === 'object') {
        const dataObject: Record<string, string> = data[prop] as Record<string, string>;
        const itemObject: Record<string, string> = item[prop] as Record<string, string>;

        for (const key of Object.keys(dataObject)) {
            expect(itemObject[key]).toBe(dataObject[key][method]());
        }

        return;
    }

    expect(item[prop]).toBe((data[prop] as string)[method]());
}

