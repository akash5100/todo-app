import app from "../app";
import request from "supertest";

describe("Test the GET req to the API", () => {
    describe("Get all the tasks available", () => {
        test("Should return message: success", async () => {
            const response = await request(app).get("/v1/tasks");
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("success");
        });
    });
});

describe('Test the POST req to the API', () => {
    describe('Add a new task', () => {
        test('Should return message: success', async () => {
            const response = await request(app).post('/v1/tasks/add').send({
                title: 'Test task',
                description: 'This is a test task',
            });
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('success');
            // Delete the task after the test
            await request(app).delete(`/v1/tasks/del/${response.body.data.id}`);
        });
    });

    describe("Add a new task without title", () => {
        test("Should return message: 'Bad request, missing title or description'", async () => {
            const response = await request(app).post("/v1/tasks/add").send({
                description: "This is a test task",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe(
                "Bad request, missing title or description"
            );
        });
    });
})