class Library {
    constructor() {
        this.books = {};
    }

    addBook(title, author, isbn, copies) {
        if (!title || !author || !isbn || !copies) {
            throw new Error('All fields are required.');
        }
        if (this.books[isbn]) {
            throw new Error('Already exists with the same ISBN.');
        }
        this.books[isbn] = { title, author, isbn, copies };
    }

    getBookByISBN(isbn) {
        return this.books[isbn] || null;
    }
}

module.exports = Library;
