const {response} = require("../data/constants");

module.exports = (req, res) => {
    res.status(response.notFound.code).json(response.notFound);
}