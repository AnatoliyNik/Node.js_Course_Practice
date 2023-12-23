import request from "supertest";
import app from "../../../../index";
import { RequestMethod } from "../../../../models/request-method.model";

export async function validateStatusCode(method: RequestMethod, url: string, data: object, statusCode: number): Promise<void> {
    const res: request.Response = await request(app)[method](url).send(data);

    expect(res.status).toBe(statusCode);
}