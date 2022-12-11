// API for performing CRUD operations on the table 'task' in the database.

/**
 * Endpoints:
 * GET /tasks - Returns all the tasks in the database.
 * GET /tasks/:id - Returns the task with the given id.
 * POST /tasks/add - Creates a new task in the database.
 * PATCH /tasks/update/:id - Updates the task with the given id.
 * DELETE /tasks/del/:id - Deletes the task with the given id.
 * PATCH /tasks/complete - Toggle the completion status of the task with the given id.
 */

import express from "express";
import db from "../database";

const router = express.Router();

// Get all tasks
router.get("/tasks", async (req, res) => {
    const sql = `SELECT * FROM task`;
    const items = await new Promise((resolve, reject) => {
        db.all(sql, (err, rows): void => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        }
        );
    });
    res.json({
        message: "success",
        data: items
    });
});

// Add a new task
router.post("/tasks/add", async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({
            message: "Bad request, missing title or description",
        });
        return;
    }

    // Also return the id of the newly created task
    const sql = `INSERT INTO task (title, description) VALUES (?, ?)`;

    const item = await new Promise((resolve, reject) => {
        db.run(sql, [title, description], (err: any, row: unknown): void => {
            if (err) reject(err);
            resolve(row);
        });
    });

    // Get the id of the newly created task
    const id = await new Promise((resolve, reject) => {
        db.get("SELECT last_insert_rowid() as id", (err, row) => {
            if (err) reject(err);
            resolve(row.id);
        });
    });

    res.json({
        message: "success",
        data: {
            "id": id,
            "title": title,
            "description": description
        }
    });
});

// Get task with id
router.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM task WHERE id = ?`;
    const item = await new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row): void => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
    res.json({
        message: "success",
        data: (item) ? item : []
    });
});

// Update task with id
router.patch("/tasks/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = `UPDATE task SET title = ?, description = ? WHERE id = ?`;
    const item = await new Promise((resolve, reject) => {
        db.run(sql, [title, description, id], (err: any, row: unknown): void => {
            if (err) reject(err);
            resolve(row);
        });
    });
    res.json({
        message: "success",
        data: item
    });
});

// Toggle task completion
router.patch("/tasks/complete", async (req, res) => {    
    const { id } = req.body;

    // Select the task with the given id and get the complete value
    let sql = `SELECT completed FROM task WHERE id = ?`;

    // Query the database to get the current value of the completed column
    const completed = await new Promise((resolve, reject) => {
        db.get(sql, [id], (err, row): void => {
            if (err) {
                reject(err);
            }
            // if we get row undefined, then the task with the given id does not exist
            if (row === undefined) {
                res.status(404).json({
                    message: "Task not found",
                });
            }
            resolve(row.completed);
        });
    });

    // Toggle the completed value (1 if it was 0, 0 if it was 1)
    const newCompleted = completed === 0 ? 1 : 0;

    // Update the database with the new completed value
    await new Promise((resolve, reject) => {
        db.run('UPDATE task SET completed = ? WHERE id = ?', [newCompleted, id], (err) => {
        if (err) {
            reject(err);
        } else {
            resolve(
                res.json({
                    message: "success",
                    completed: newCompleted
                })
            );
        }
        });
    });
});

// Delete task with id
router.delete("/tasks/del/:id", async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM task WHERE id = ?`;
    const item = await new Promise((resolve, reject) => {
        db.run(sql, [id], (err: any, row: unknown): void => {
            if (err) reject(err);
            resolve(row);
        });
    });
    res.json({
        message: "success",
        data: item
    });
});


export { router as v1Routes };
