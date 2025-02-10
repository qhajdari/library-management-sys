const Library = require('./library');

test('need to add a book and get it via ISBN', () => {
    const library = new Library();
    library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "123456789", 5);

    expect(library.getBookByISBN("123456789")).toEqual({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "123456789",
        copies: 5
    });
});
