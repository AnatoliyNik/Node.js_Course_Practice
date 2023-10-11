const server = {
    port: process.env.PORT || 3000,
    get url() {
        return `http://localhost:${ this.port }`
    }
}

const response = {
    ok: {
        code: 200,
        message: 'OK'
    },
    notFound: {
        code: 404,
        message: 'Not Found'
    },
    internalServerError: {
        code: 500,
        message: 'Internal Server Error'
    }
}

const url = {
    healthCheck: '/health-check',
    apiDocs: '/api-docs',
    books: '/books',
}

module.exports = {
    server,
    response,
    url
}