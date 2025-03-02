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
        const borrowedBooksArray = [];
    
        for (const [userId, borrowedIsbns] of Object.entries(this.borrowSystem.borrowedBooks)) {
            borrowedIsbns.forEach(isbn => {
                const book = this.library.books[isbn];
    
                borrowedBooksArray.push({
                    title: book?.title || "Unknown",
                    author: book?.author || "Unknown",
                    isbn: isbn,
                    borrower: userId,
                    dueDate: "N/A" // IF `dueDate` if the date when the book should be returned, then it should be implemented in the BorrowSystem });
                });
            });
        }
    
        return borrowedBooksArray;
    }
    
}

module.exports = ReportSystem;
