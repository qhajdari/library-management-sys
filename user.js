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

    updateUserEmail(userId, newEmail) {
        if (!this.users[userId]) {
            throw new Error('User does not exist.');
        }
        this.users[userId].email = newEmail;
    }
}

module.exports = UserManager;
