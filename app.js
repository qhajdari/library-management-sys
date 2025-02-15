const Library = require('./library'); // Import Library Class

const library = new Library(); // Create a library instance

// Add new book
library.addBook("1984", "George Orwell", "123456", 3);
// Print the book by ISBN
console.log(library.getBookByISBN("123456"));

// Update copies of the book
library.updateCopies("123456", 5);
// Print copies of the book
console.log(library.getBookByISBN("123456")); // Return copies to 5

// Delete the book
library.deleteBook("123456");
// Print deleted book by ISBN
console.log(library.getBookByISBN("123456")); // Return null





