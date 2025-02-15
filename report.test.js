const Library = require('./library');
const UserManager = require('./user');
const BorrowSystem = require('./borrow');
const ReportSystem = require('./report');

describe('Report System Tests', () => {
    let library, userManager, borrowSystem, reportSystem;

    beforeEach(() => {
        library = new Library();
        userManager = new UserManager();
        borrowSystem = new BorrowSystem(library, userManager);
        reportSystem = new ReportSystem(library, borrowSystem);

        // Add books to the library
        library.addBook("Ferma e Kafsheve", "George Orwell", "123456", 3);
        library.addBook("1984", "George Orwell", "654321", 2);

        // Register users
        userManager.registerUser("Qendresa", "qendresahajdari@example.com", "user1");
        userManager.registerUser("Bob", "bob@example.com", "user2");

        // Borrow some books
        borrowSystem.borrowBook("user1", "123456");
        borrowSystem.borrowBook("user2", "654321");
    });

    test('should lists all books in the system', () => {
        expect(reportSystem.listAllBooks()).toEqual([
            { title: "Ferma e Kafsheve", author: "George Orwell", isbn: "123456", copies: 2 },
            { title: "1984", author: "George Orwell", isbn: "654321", copies: 1 }
        ]);
    });

    test('should lists all books borrowed by all users', () => {
        expect(reportSystem.listAllBorrowedBooks()).toEqual({
            "user1": ["123456"],
            "user2": ["654321"]
        });
    });
});
