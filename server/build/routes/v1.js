"use strict";
// API for performing CRUD operations on the table 'task' in the database.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Routes = void 0;
/**
 * Endpoints:
 * GET /tasks - Returns all the tasks in the database.
 * GET /tasks/:id - Returns the task with the given id.
 * POST /tasks/add - Creates a new task in the database.
 * PATCH /tasks/update/:id - Updates the task with the given id.
 * DELETE /tasks/:id - Deletes the task with the given id.
 * PATCH /tasks/complete/:id - Toggle the completion status of the task with the given id.
 *
 */
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database"));
const router = express_1.default.Router();
exports.v1Routes = router;
// Get all tasks
router.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT * FROM task`;
    const items = yield new Promise((resolve, reject) => {
        database_1.default.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
    res.json({
        message: "success",
        data: items
    });
}));
// Add a new task
router.post("/tasks/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.query;
    const sql = `INSERT INTO task (title, description) VALUES (?, ?)`;
    const item = yield new Promise((resolve, reject) => {
        database_1.default.run(sql, [title, description], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
    res.json({
        message: "Task added",
        data: {
            title: title,
            description: description
        }
    });
}));
// Get task with id
router.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sql = `SELECT * FROM task WHERE id = ?`;
    const item = yield new Promise((resolve, reject) => {
        database_1.default.get(sql, [id], (err, row) => {
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
}));
// Update task with id
router.patch("/tasks/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.query;
    const sql = `UPDATE task SET title = ?, description = ? WHERE id = ?`;
    const item = yield new Promise((resolve, reject) => {
        database_1.default.run(sql, [title, description, id], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
    res.json({
        message: "success",
        data: item
    });
}));
// Toggle task completion
router.patch("/tasks/complete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Select the task with the given id and get the complete value
    let sql = `SELECT completed FROM task WHERE id = ?`;
    // Query the database to get the current value of the completed column
    const completed = yield new Promise((resolve, reject) => {
        database_1.default.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row.completed);
            }
        });
    });
    // Toggle the completed value (1 if it was 0, 0 if it was 1)
    const newCompleted = completed === 0 ? 1 : 0;
    // Update the database with the new completed value
    yield new Promise((resolve, reject) => {
        database_1.default.run('UPDATE task SET completed = ? WHERE id = ?', [newCompleted, id], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.json({
                    message: "success",
                    data: newCompleted
                }));
            }
        });
    });
}));
// Delete task with id
router.delete("/tasks/del/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sql = `DELETE FROM task WHERE id = ?`;
    const item = yield new Promise((resolve, reject) => {
        database_1.default.run(sql, [id], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
    res.json({
        message: "success",
        data: item
    });
}));
