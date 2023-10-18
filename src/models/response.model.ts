type Statuses = 'ok' | 'notFound' | 'internalServerError';

interface Response {
    code: number;
    message: string;
}

export type Responses = {
    [key in Statuses]: Response
}