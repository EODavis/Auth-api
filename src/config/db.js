const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function initializeDb() {
    db =await open({
        filename: path.join(__dirname, "../../data.db"),
        driver: sqlite3.Database,
    });

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL,
        createdAt TEXT NOT NULL
    )
   `);

   console.log('Database connected and users table ready');
   return db;
}

function getDb(){
    if (!db) {
        throw new Error('Database not initialized. Call initializedDb() first.');
    }
    return db;
}

module.exports = { initializeDb, getDb };