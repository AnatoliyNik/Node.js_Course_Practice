const {Router} = require('express');
const Book = require('../models/Book');
const {response} = require('../data/constants')

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the book
 *         title:
 *           type: string
 *           description: Book title
 *         author:
 *           type: string
 *           description: Book author
 *       example:
 *         id: 1
 *         title: The Hitchhiker's Guide to the Galaxy
 *         author: Douglas Adams
 *     Response:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           description: Status code
 *         message:
 *           type: string
 *           description: Message from the server
 *       example:
 *         code: 777
 *         message: Message from the server
 *
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Book id
 *
 *   responses:
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     NotFound:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 */


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Returns list of all books
 *     responses:
 *       200:
 *         description: Received list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/', async (req, res, next) => {
    try {
        const books = await Book.getAllBooks();
        res.send(books);
    } catch (err) {
        next(err);
    }
})

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Returns book by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Received book by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const book = await Book.getBook(id);

        if (!book) {
            res.status(response.notFound.code).send(response.notFound);
        }

        res.send(book);
    } catch (err) {
        next(err);
    }
})

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: New book was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post('/', async (req, res, next) => {
    try {
        const book = getBookFromRequest(req);

        const newBook = await Book.createBook(book);

        res.send(newBook);
    } catch (err) {
        next(err);
    }
})

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update book by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const book = getBookFromRequest(req, next);

        const changedBook = await Book.updateBook(id, book);

        if (!changedBook) {
            res.status(response.notFound.code).send(response.notFound);
        }

        res.send(changedBook);
    } catch (err) {
        next(err);
    }
})

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete book by its id
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Book was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const result = await Book.deleteBook(id);

        if (!result) {
            return res.status(response.notFound.code).send(response.notFound);
        }

        res.status(response.ok.code).send(response.ok);
    } catch (err) {
        next(err);
    }
})

function getBookFromRequest(req) {
    if (!req.body.title || !req.body.author) {
        throw new Error('Not completed request')
    }

    const title = String(req.body.title).trim();
    const author = String(req.body.author).trim();

    return new Book(title, author);
}

module.exports = router;