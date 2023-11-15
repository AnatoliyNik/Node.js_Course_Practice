import { validateStatusCode } from "./status-code.validator";
import { response } from "../../../../data/constants";
import { RequestMethod } from "../../../../models/request-method.model";
import { ModelName } from "../../../../models/model-name.model";

export function validateBadIdError(method: RequestMethod, name: ModelName, url: string): void {
    it(`should return status code 500 if ${name} id is not ObjectId`, async () => {
        await validateStatusCode(method, url, {}, response.internalServerError.code);
    });
}
