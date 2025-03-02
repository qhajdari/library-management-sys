class ReportSystem {
    constructor(library, borrowSystem) {
        this.library = library;
        this.borrowSystem = borrowSystem;
    }

    listAllBooks() {
        return Object.values(this.library.books).map(book => ({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            copies: book.copies
        }));
    }
    

    listAllBorrowedBooks() {
        return this.borrowSystem.borrowedBooks;
    }
}

module.exports = ReportSystem;
