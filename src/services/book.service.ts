import fs from "fs";
import path from "path";

export default class Book {
    static dbPath: string = path.join(__dirname, '..', 'data', 'mock-data.json');

    id?: string;

    constructor(public title: string, public author: string) {
        this.title = title;
        this.author = author;
    }

    static getAllBooks(): Promise<Book[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(
                this.dbPath,
                'utf-8',
                (err: NodeJS.ErrnoException | null, data: string) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(JSON.parse(data));
                });
        });
    }

    static async getBook(id: string): Promise<Book | undefined> {
        const books: Book[] = await this.getAllBooks();
        const book: Book | undefined = books.find(book => book.id === id);

        if (!book) {
            return;
        }

        return book;
    }

    static async createBook(book: Book): Promise<Book> {
        const books: Book[] = await this.getAllBooks();

        book.id = Date.now().toString();
        books.push(book);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                this.dbPath,
                JSON.stringify(books),
                'utf-8',
                (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(book);
                }
            );
        });
    }

    static async updateBook(id: string, book: Book): Promise<Book | undefined> {
        const books: Book[] = await this.getAllBooks();
        const index: number = books.findIndex(book => book.id === id);

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
                (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(books[index]);
                }
            );
        });
    }

    static async deleteBook(id: string): Promise<string | undefined> {
        const books: Book[] = await this.getAllBooks();
        const index: number = books.findIndex(book => book.id === id);

        if (index === -1) {
            return;
        }

        books.splice(index, 1);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                this.dbPath,
                JSON.stringify(books),
                'utf-8',
                (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve('deleted');
                }
            );
        });
    }
}