class Library {
    constructor() {
        this.books = {};
    }

    addBook(title, author, isbn, copies) {
        this.books[isbn] = { title, author, isbn, copies };
    }

    getBookByISBN(isbn) {
        return this.books[isbn] || null;
    }
}

module.exports = Library;
