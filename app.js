const Library = require('./library'); // Import Library Class
const UserManager = require('./user'); // Import User Class
const BorrowSystem = require('./borrow'); // Import Borrow Class


const library = new Library(); // Create a library instance
const userManager = new UserManager();
const borrowSystem = new BorrowSystem(library, userManager);


// Add new book
library.addBook("1984", "George Orwell", "123456", 3);
// Print the book by ISBN
console.log(library.getBookByISBN("123456"));

// Update copies of the book
library.updateCopies("123456", 5);
// Print copies of the book
console.log(library.getBookByISBN("123456")); // Return copies to 5

// Delete the book
//library.deleteBook("123456");
// Print deleted book by ISBN
//console.log(library.getBookByISBN("123456")); // Return null


//GetUserById
userManager.registerUser("Qendresa", "qendresa@example.com", "user1");
console.log(userManager.getUserById("user1"));

//UpdateUserEmail
userManager.updateUserEmail("user1", "qendresahajdari@exaple.com", "user1");
console.log(userManager.getUserById("user1"));

//Check if the book exists
console.log("Book before borrowing:", library.getBookByISBN("123456"));

//Borrowed books by user
borrowSystem.borrowBook("user1", "123456");
console.log("Borrowed books:", borrowSystem.getBorrowedBooks("user1"));










