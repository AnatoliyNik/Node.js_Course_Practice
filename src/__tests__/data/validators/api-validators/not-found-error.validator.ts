import { response } from "../../../../data/constants";
import { validateStatusCode } from "./status-code.validator";
import { RequestMethod } from "../../../../models/request-method.model";
import { ModelName } from "../../../../models/model-name.model";

export function validateNotFoundError(method: RequestMethod, name: ModelName, url: string, message?: string): void {
    it(message ||`should return status code 404 if there is no ${name} with such id`, async () => {
        await validateStatusCode(method, url, {}, response.notFound.code);
    });
}
