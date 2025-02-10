const Library = require('./library');

describe('Library Class Tests', () => {
    let library;

    beforeEach(() => {
        library = new Library();
    });

    test('Need to add a book and get it via ISBN', () => {
        library.addBook("Gjenerali i ushtrise se vdekur", "Ismail Kadare", "123456789", 5);
        expect(library.getBookByISBN("123456789")).toEqual({
            title: "Gjenerali i ushtrise se vdekur",
            author: "Ismail Kadare",
            isbn: "123456789",
            copies: 5
        });
    });

    test('Return null if this book does not exist', () => {
        expect(library.getBookByISBN("987654321")).toBeNull();
    });

    test('Throw an error when adding a book with an existing ISBN', () => {
        library.addBook("Gjenerali i ushtrise se vdekur", "Ismail Kadare", "123456789", 5);
        expect(() => {
            library.addBook("Another Book", "Another Author", "123456789", 3);
        }).toThrow('A book with this ISBN already exist.');
    });

    test('Throw an error when book data is missing', () => {
        expect(() => {
            library.addBook(null, "Author", "123456789", 5);
        }).toThrow('All fields are required.');
    });
});
