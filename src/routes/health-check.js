const {Router} = require('express');
const {response} = require("../data/constants");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health check
 *   description: API for checking server
 */

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Checks if the server is running
 *     tags: [Health check]
 *     responses:
 *       200:
 *         description: The server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: status code
 *                 message:
 *                   type: string
 *                   description: response from server
 *               example:
 *                 code: 200
 *                 message: OK
 */

router.get('/', (req, res) => {
    res.json(response.ok);
});

module.exports = router;