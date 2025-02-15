const UserManager = require('./user');

describe('User Management Tests', () => {
    let userManager;

    beforeEach(() => {
        userManager = new UserManager();
    });

    test('Need to register a new user and get with ID', () => {
        userManager.registerUser("Qendresa Hajdari", "qendresa@example.com", "user1");

        expect(userManager.getUserById("user1")).toEqual({
            name: "Qendresa Hajdari",
            email: "qendresa@example.com",
            userId: "user1"
        });
    });

    test('Need to update user email', () => {
        userManager.registerUser("Qendresa Hajdari", "qendresa@example.com", "user1");
        userManager.updateUserEmail("user1", "qendresa2@example.com");

        expect(userManager.getUserById("user1").email).toBe("qendresa2@example.com");
    });

    test('Return null if this user does not exist', () => {
        expect(userManager.getUserById("unknown")).toBeNull();
    });
});
