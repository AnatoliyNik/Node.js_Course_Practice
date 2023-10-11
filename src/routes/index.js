const {Router} = require('express');
const healthCheckRoutes = require('./health-check');
const booksRoutes = require('./books');
const {url} = require('../data/constants');
const swagger = require("../middleware/swagger");
const notFound = require('../middleware/not-found-error-handler');

const router = Router();

router.use(url.apiDocs, swagger);
router.use(url.healthCheck, healthCheckRoutes);
router.use(url.books, booksRoutes);
router.use(notFound);

module.exports = router;