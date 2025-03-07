const Library = require('./library');
const UserManager = require('./user');
const BorrowSystem = require('./borrow');

describe('Borrow and Return System Tests', () => {
    let library, userManager, borrowSystem;

    beforeEach(() => {
        library = new Library();
        userManager = new UserManager();
        borrowSystem = new BorrowSystem(library, userManager);

        // Add a book to the library
        library.addBook("Ana Karenina", "L.Tolstoi", "123456", 3);

        // Register a user
        userManager.registerUser("Qendresa", "qendresa@example.com", "user1");
        userManager.registerUser("Qendresa222", "qendresa222@example.com", "user2");
        userManager.registerUser("Qendresa333", "qendresa333@example.com", "user3");
        userManager.registerUser("Qendresa444", "qendresa444@example.com", "user4");
    });

    test('Should allow a user to borrow a book if there are copies available', () => {
        borrowSystem.borrowBook("user1", "123456");
        expect(borrowSystem.getBorrowedBooks("user1")).toContain("123456");
    });

    test('Should prevent borrowing if there are no more copies available', () => {
        borrowSystem.borrowBook("user1", "123456");
        borrowSystem.borrowBook("user2", "123456");
        borrowSystem.borrowBook("user3", "123456");

        expect(() => {
            borrowSystem.borrowBook("user4", "123456");
        }).toThrow('There are no more copies available for this book.');
    });

    test('Must record the return of a book and update available copies', () => {
        borrowSystem.borrowBook("user1", "123456");
        borrowSystem.returnBook("user1", "123456");

        expect(borrowSystem.getBorrowedBooks("user1")).not.toContain("123456");
    });

    test('Should list all books borrowed by a user', () => {
        borrowSystem.borrowBook("user1", "123456");
        expect(borrowSystem.getBorrowedBooks("user1")).toEqual(["123456"]);
    });
});
