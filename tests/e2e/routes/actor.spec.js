const request = require("supertest");
const app = require("../../../src/app");
const utils = require("../../utils");

describe("Actors Routes", () => {
  beforeEach(async () => {
    await utils.initializeDB();
    await utils.addDummyData();
  });

  it("GET All Actors", async () => {
    const response = await request(app).get("/actor");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.results.length).toBeGreaterThan(0);
  });

  it("GET Actors By ID", async () => {
    const response = await request(app).get("/actor?id=1");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(1);
  });

  it("GET Error actor not found by ID ", async () => {
    const response = await request(app).get("/actor?id=10000");
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("GET Actors By Name", async () => {
    const response = await request(app).get("/actor?search=jack");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.results.length).toBeGreaterThan(0);
  });
});
