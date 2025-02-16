# Library Management System
This project is a simple book management system using **JavaScript** by using **Test-Driven Development(TDD)**

# Used techologies
- **Javascript (Node.js)**
- **Jest for testing**
- **Git & GitHub Actions (CI/CD for automated tests)**

# Main functionalities of this project are:
- **Book Management (library.js)** 
    - Add books
    - Get books by ISBN
    - Update copies
    - Delete a book from the system
- **User Management(user.js)**
    - Register a user 
    - Update user
- **Borrowing and Returning Books(borrow.js)**
    - Borrow a book
    - Return a book
- **Reporting(report.js)**
    - List all available books
    - List all borrowed books

# **TDD Process (Red, Green, Refactor)**
## **Book Management**
### **Red Phase - Write a failing test for 'addBook()'**
First, we write a test that checks if a book can be added and retrieved by ISBN. Since `addBook()` is not implemented yet, this test will fail. 

```javascript
const Library = require('./library'); 

    test('Need to add a book and get it via ISBN', () => {
        library.addBook("Gjenerali i ushtrise se vdekur", "Ismail Kadare", "123456789", 5);
        expect(library.getBookByISBN("123456789")).toEqual({
            title: "Gjenerali i ushtrise se vdekur",
            author: "Ismail Kadare",
            isbn: "123456789",
            copies: 5
        });
    });

//This test fails because addBook() is not implemented yet. 
```

### **Green Phase - Implement addBook()**
```javascript
class Library {
    constructor() {
        this.books = {};
    }

    addBook(title, author, isbn, copies) {
        this.books[isbn] = { title, author, isbn, copies };
    }

    getBookByISBN(isbn) {
        return this.books[isbn] || null;
    }
}

module.exports = Library;

//Now the tests pass successfully. 
```

### **Refactor Phase - Improve the code** 
```javascript
addBook(title, author, isbn, copies) {
        if (!title || !author || !isbn || !copies) {
            throw new Error('All fields are required.');
        }
        if (this.books[isbn]) {
            throw new Error('Already exists with the same ISBN.');
        }
        this.books[isbn] = { title, author, isbn, copies };
    }

```

## How to run the tests?
1. Make sure you have **Node.js** and **Jest** installed
2. Run this command in the terminal:

```bash
npm test
```

**This project follows the TDD methodology, ensuring that all functionalities are tested before implementation.**
**GitHub Actions are set up for Continuous Integration (CI), automatically running tests on every push or pull request.**
**Future improvements may include:**
- Tracking overdue books
- Adding a REST API for better accessibility
