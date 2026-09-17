const { getDb } = require('../config/db');

async function getUserByEmail(email) {
    const db = getDb();
    return db.get('SELECT * FROM users WHERE email =?', [email]);
}

async function getUserById(id) {
    const db = getDb();
    return db.get('SELECT id, username, email, createdAt FROM users WHERE id = ?', [id]);
}

async function createUser({ username, email, passwordHash }) {
    const db = getDb();
    const createdAt = new Date().toISOString();

    const result = await db.run(
        'INSERT INTO users (username, email, passwordHash, createdAt) VALUES(?, ?, ?, ?)',
        [username, email, passwordHash, createdAt]
    );

    return getUserById(result.lastID);
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
};