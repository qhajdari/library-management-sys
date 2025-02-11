const UserManager = require('./user');

describe('User Management Tests', () => {
    let userManager;

    beforeEach(() => {
        userManager = new UserManager();
    });

    test('Need to register a new user and get with ID', () => {
        userManager.registerUser("John Doe", "john@example.com", "user123");

        expect(userManager.getUserById("user123")).toEqual({
            name: "John Doe",
            email: "john@example.com",
            userId: "user123"
        });
    });

    test('Need to update user email', () => {
        userManager.registerUser("John Doe", "john@example.com", "user123");
        userManager.updateUserEmail("user123", "newemail@example.com");

        expect(userManager.getUserById("user123").email).toBe("newemail@example.com");
    });

    test('Return null if this user does not exist', () => {
        expect(userManager.getUserById("unknown")).toBeNull();
    });
});
