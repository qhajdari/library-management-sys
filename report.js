class ReportSystem {
    constructor(library, borrowSystem) {
        this.library = library;
        this.borrowSystem = borrowSystem;
    }

    listAllBooks() {
        return Object.values(this.library.books);
    }

    listAllBorrowedBooks() {
        return this.borrowSystem.borrowedBooks;
    }
}

module.exports = ReportSystem;
