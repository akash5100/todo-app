"use strict";
/*
    This file contains the database connection and the schema for the database
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const DBSOURCE = "db.sqlite";
// task table schema for todo-list app
const db = new sqlite3_1.default.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log("Connected to the database.");
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    completed BOOLEAN NOT NULL DEFAULT 0
                )`, (err) => {
                if (err) {
                    console.log("Table already exists.");
                }
                else {
                    console.log("Table created.");
                }
            });
        });
    }
});
exports.default = db;
