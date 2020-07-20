const suppertest = require("supertest");
const server = require("../index");
const { intersect } = require("../data/dbConfig");
const supertest = require("supertest");
const db = require("../data/dbConfig");

beforeEach(async () => {
    // re-run the seeds and start with a fresh database for each test
    await db.seed.run();
});

afterAll(async () => {
    // closes the database connection so the jest command doesn't stall
    await db.destroy();
});

describe("boggits integration tests", () => {
    it("GET Hobbits", async () => {
        const res = await supertest(server).get("/hobbits");
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body).toHaveLength(5);
        expect(res.body[2].name).toBe("Merry");
    });

    it("GET Hobbit by ID", async () => {
        const res = await suppertest(server).get("/hobbits/1");
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.name).toBe("Frodo");
        expect(res.body.id).toBe(1);
    });

    it("GET Hobbit by ID, not found", async () => {
        const res = await supertest(server).get("/hobbits/7");
        expect(res.statusCode).toBe(404);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.message).toBe("Hobbit not found");
    });

    it("Add a new hobbit", async () => {
        const res = await supertest(server).post("/hobbit").send({
            name: "New Hobbit",
            age: 500
        });
        expect(res.statusCode).toBe(201);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.name).toBe("New Hobbit");
        expect(res.body.id).toBeDefined();
    });

    it("Update a hobbit", async () => {
        const res = await supertest(server).put("/hobbits/4").send({
            name: "Updated hobbit",
            age: 456
        });
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.name).toBe("Updated hobbit");
        expect(res.body.age).toBe(456);
        expect(res.body.id).toBeDefined();
    });

    it("Update a hobbit, not found", async () => {
        const res = await supertest(server).put("/hobbits/8").send({
            name: "Not updated hobbit",
            age: 135
        });
        expect(res.statusCode).toBe(404);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body.message).toBe("Hobbit not found");
    });

    it("Delete a hobbit", async () => {
        const res = await supertest(server).delete("/hobbits/5");
        expect(res.statusCode).toBe(204);
        expect(res.text).toBe("");
    });
});
