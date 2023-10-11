const fs = require('fs');
const path = require('path');

class Book {
    static dbPath = path.join(__dirname, '..', 'data', 'mock-data.json');

    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    static getAllBooks() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                this.dbPath,
                'utf-8',
                (err, data) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(JSON.parse(data));
                })
        })
    }

    static async getBook(id) {
        const books = await this.getAllBooks();
        const book = books.find(book => book.id === id);

        if (!book) {
            return;
        }

        return book;
    }

    static async createBook(book) {
        const books = await this.getAllBooks();

        book.id = Date.now().toString();
        books.push(book);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                this.dbPath,
                JSON.stringify(books),
                'utf-8',
                (err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(book);
                }
            )

        })
    }

    static async updateBook(id, book) {
        const books = await this.getAllBooks();
        const index = books.findIndex(book => book.id === id);

        if (index === -1) {
            return;
        }

        books[index] = {
            ...books[index],
            ...book
        };

        return new Promise((resolve, reject) => {
            fs.writeFile(
                this.dbPath,
                JSON.stringify(books),
                'utf-8',
                (err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(books[index]);
                }
            )

        })
    }

    static async deleteBook(id) {
        const books = await this.getAllBooks();
        const index = books.findIndex(book => book.id === id);

        if (index === -1) {
            return;
        }

        books.splice(index, 1);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                this.dbPath,
                JSON.stringify(books),
                'utf-8',
                (err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve('deleted');
                }
            )
        })
    }
}

module.exports = Book;