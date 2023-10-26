import { Router } from 'express';
import MovieModel from "../db-models/movie.model";
import getAll from "../middleware/get-all-handler";
import getById from "../middleware/get-by-id-handler";
import remove from "../middleware/remove-handler";
import create from "../middleware/create-handler";
import update from "../middleware/update-handler";
import getMoviesByGenre from "../middleware/get-movies-by-genre-handler";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing movies
 *
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - releaseDate
 *         - genre
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated id of the movie
 *         title:
 *           type: string
 *           description: Movie title
 *         description:
 *           type: string
 *           description: Movie description
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Movie release date
 *         genre:
 *           type: array
 *           description: Array of movie genres
 *           items:
 *             type: string
 *             description: Genre name
 *       example:
 *         _id: 653815736b93cd8422949cf3
 *         title: Harry Potter
 *         description: J.K. Rowling's book series
 *         releaseDate: 2001-07-16
 *         genre: ['fantasy', 'adventure']
 *
 *   parameters:
 *     genreNameParam:
 *       in: path
 *       name: genreName
 *       schema:
 *         type: string
 *       required: true
 *       description: Genre name
 */


/**
 * @swagger
 * /movies:
 *   get:
 *     tags: [Movies]
 *     summary: Returns list of all movies
 *     responses:
 *       200:
 *         description: Received array of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/', getAll(MovieModel));

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     tags: [Movies]
 *     summary: Returns movie by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Received movie by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/:id', getById(MovieModel));

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     tags: [Movies]
 *     summary: Returns list of movie by genre
 *     parameters:
 *       - $ref: '#/components/parameters/genreNameParam'
 *     responses:
 *       200:
 *         description: Received list of movie by genre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/genre/:genreName', getMoviesByGenre);

/**
 * @swagger
 * /movies:
 *   post:
 *     tags: [Movies]
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: New movie was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post('/', create(MovieModel));

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     tags: [Movies]
 *     summary: Update movie by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.put('/:id', update(MovieModel));

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     tags: [Movies]
 *     summary: Delete movie by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Movie was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.delete('/:id', remove(MovieModel));

export default router;