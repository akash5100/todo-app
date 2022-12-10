/*
    This file contains the database connection and the schema for the database
*/

import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

// task table schema for todo-list app
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the database.");

        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    completed BOOLEAN NOT NULL DEFAULT 0
                )`,
                (err) => {
                    if (err) {
                        console.log("Table already exists.");
                    } else {
                        console.log("Table created.");
                    }
                }
            );
        });
    }
});

export default db;
