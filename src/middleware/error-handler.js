const {response} = require("../data/constants");

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(response.internalServerError.code).json(response.internalServerError);
}