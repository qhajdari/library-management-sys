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

    updateCopies(isbn, newCopies) {
        if (this.books[isbn]) {
            this.books[isbn].copies = newCopies;
        } else {
            throw new Error('Book does not exist.');
        }
    }

    deleteBook(isbn) {
        if (this.books[isbn]) {
            delete this.books[isbn];
        } else {
            throw new Error('Book does not exist.');
        }
    }
    
    
}

module.exports = Library;