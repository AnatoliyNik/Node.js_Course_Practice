import { Router } from 'express';
import GenreModel from "../db-models/genre.model";
import getAll from "../middleware/get-all-handler";
import getById from "../middleware/get-by-id-handler";
import remove from "../middleware/remove-handler";
import create from "../middleware/create-handler";
import update from "../middleware/update-handler";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: API for managing genres
 *
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated id of the genre
 *         name:
 *           type: string
 *           description: Genre name
 *       example:
 *         _id: 653815736b93cd8422949cf3
 *         name: Fantasy
 */


/**
 * @swagger
 * /genres:
 *   get:
 *     tags: [Genres]
 *     summary: Returns list of all genres
 *     responses:
 *       200:
 *         description: Received array of all genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/', getAll(GenreModel));

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     tags: [Genres]
 *     summary: Returns genre by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Received genre by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/:id', getById(GenreModel));

/**
 * @swagger
 * /genres:
 *   post:
 *     tags: [Genres]
 *     summary: Create a new genre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: New genre was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post('/', create(GenreModel));

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     tags: [Genres]
 *     summary: Update genre by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Genre was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.put('/:id', update(GenreModel));

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     tags: [Genres]
 *     summary: Delete genre by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Genre was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.delete('/:id', remove(GenreModel));

export default router;