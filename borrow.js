class BorrowSystem {
    constructor(library, userManager) {
        this.library = library;
        this.userManager = userManager;
        this.borrowedBooks = {}; // { userId: [isbn1, isbn2] }
    }

    borrowBook(userId, isbn) {
        const user = this.userManager.getUserById(userId);
        const book = this.library.getBookByISBN(isbn);

        if (!user) {
            throw new Error('User does not exist.');
        }
        if (!book) {
            throw new Error('Book does not exist.');
        }
        if (book.copies === 0) {
            throw new Error('There are no more copies available for this book.');
        }

        if (!this.borrowedBooks[userId]) {
            this.borrowedBooks[userId] = [];
        }

        if (this.borrowedBooks[userId].includes(isbn)) {
            throw new Error('User has already borrowed this book.');
        }
    
        this.borrowedBooks[userId].push(isbn);
        book.copies -= 1;
    }

    returnBook(userId, isbn) {
        if (!this.borrowedBooks[userId] || !this.borrowedBooks[userId].includes(isbn)) {
            throw new Error('This book has not been borrowed by this user.');
        }

        tthis.borrowedBooks[userId] = this.borrowedBooks[userId].filter(book => book !== isbn);
    
        const book = this.library.getBookByISBN(isbn);
        if (book) {
            book.copies += 1;
        }
    }

    getBorrowedBooks(userId) {
        return this.borrowedBooks[userId] || [];
    }
}

module.exports = BorrowSystem;
