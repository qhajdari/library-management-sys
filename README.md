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
### **Red Phase - Failed test for 'addBook()'**
First, I write a test that checks if a book can be added and retrieved by ISBN. Since `addBook()` is not implemented yet, this test will fail. 

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


## **User Management**
### **Red Phase - Failed test for 'userManager()'**
This test will fail because registerUser() is not yet implemented! 

```javascript
const UserManager = require('../src/user');
    test('Need to register a new user and get with ID', () => {
        userManager.registerUser("Qendresa Hajdari", "qendresa@example.com", "user1");

        expect(userManager.getUserById("user1")).toEqual({
            name: "Qendresa Hajdari",
            email: "qendresa@example.com",
            userId: "user1"
        });
    });
```

### **Green Phase - Implement registerUser()**
In user.js, we add a basic implementation for registerUser(). The test should now pass successfully.

```javascript
class UserManager {
    constructor() {
        this.users = {};
    }

    registerUser(name, email, userId) {
         this.users[userId] = { name, email, userId };
    }

    getUserById(userId) {
        return this.users[userId] || null;
    }
}
```

### **Refactor Phase - Improve the code**
Now let's improve registerUser() by adding validations to avoid registering invalid data:

```javascript
class UserManager {
    constructor() {
        this.users = {};
    }

    registerUser(name, email, userId) {
        if (!name || !email || !userId) {
            throw new Error('All fields are required.');
        }
        if (this.users[userId]) {
            throw new Error('This user ID already exist.');
        }
        this.users[userId] = { name, email, userId };
    }

    getUserById(userId) {
        return this.users[userId] || null;
    }
}
```
### Red Phase – Failed test for updateUserEmail()
In user.test.js, a test is added to update a user's email. However, this test will fail because updateUserEmail() is not yet implemented!

```javascript
const UserManager = require('../src/user');

 test('Need to update user email', () => {
        userManager.registerUser("Qendresa Hajdari", "qendresa@example.com", "user1");
        userManager.updateUserEmail("user1", "qendresahajdari@example.com");

        expect(userManager.getUserById("user1").email).toBe("qendresahajdari@example.com");
    });
```
### **Green Phase - Implement updateUserEmail()**
In user.js, we add this method to pass the test

```javascript

updateUserEmail(userId, newEmail) {
    if (!this.users[userId]) {
        throw new Error('User does not exist.');
    }
    this.users[userId].email = newEmail;
}

```

### **Refactor Phase - Improvement of updateUserEmail()**
In user.js, let's improve it to ensure accurate validations.

```javascript

updateUserEmail(userId, newEmail) {
    if (!this.users[userId]) {
        throw new Error('User does not exist.');
    }
    if (!newEmail.includes("@")) {
        throw new Error('Invalid email format.');
    }
    this.users[userId].email = newEmail;
}

```


## **Borrowing and Returning Books**
### **Red Phase - Failed test for 'borrowBook()'**
This test will fail because borrowBook() is not yet implemented! 

```javascript
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
    });

    test('Should allow a user to borrow a book if there are copies available', () => {
        borrowSystem.borrowBook("user1", "123456");
        expect(borrowSystem.getBorrowedBooks("user1")).toContain("123456");
    });
});

```
### **Green Phase - Implement borrowBook()**
In borrow.js, we add this method to pass the test

```javascript
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

        this.borrowedBooks[userId].push(isbn);
        book.copies -= 1;
    }
}

module.exports = BorrowSystem;

```

### **Refactor Phase - Improvement of borrowBook()**
In borrow.js, let's improve it to ensure accurate validations.

```javascript

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

```

### **Red Phase - Failed test for 'returnBook()'**
This test will fail because returnBook() is not yet implemented! 

```javascript

 test('Must record the return of a book and update available copies', () => {
        borrowSystem.borrowBook("user1", "123456");
        borrowSystem.returnBook("user1", "123456");

        expect(borrowSystem.getBorrowedBooks("user1")).not.toContain("123456");
    });

```

### **Green Phase - Implement returnBook()**
In borrow.js, we add this method to pass the test

```javascript
returnBook(userId, isbn) {
        if (!this.borrowedBooks[userId] || !this.borrowedBooks[userId].includes(isbn)) {
            throw new Error('This book has not been borrowed by this user.');
        }

        this.borrowedBooks[userId] = this.borrowedBooks[userId].filter(bookIsbn => bookIsbn !== isbn);
        this.library.getBookByISBN(isbn).copies += 1;
    }

```

### **Refactor Phase - Improvement of returnBook()**
In borrow.js, let's improve it to ensure accurate validations.

```javascript
returnBook(userId, isbn) {
        if (!this.borrowedBooks[userId] || !this.borrowedBooks[userId].includes(isbn)) {
            throw new Error('This book has not been borrowed by this user.');
        }

        this.borrowedBooks[userId] = this.borrowedBooks[userId].filter(book => book !== isbn);
    
        const book = this.library.getBookByISBN(isbn);
        if (book) {
            book.copies += 1;
        }
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
