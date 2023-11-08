type Statuses = 'ok' | 'notFound' | 'internalServerError' | 'badRequest';

interface Response {
    code: number;
    message: string;
}

export type Responses = {
    [key in Statuses]: Response
}