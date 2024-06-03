const request = require("supertest");
const app = require("../../../src/app");
const utils = require("../../utils");

describe("Movies Routes", () => {
  beforeEach(async () => {
    await utils.initializeDB();
    await utils.addDummyData();
  });

  afterEach(async () => {
    await utils.clearAllTables();
  });

  it("GET ALL Movies", async () => {
    const response = await request(app).get("/movie");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("GET Movie by ID", async () => {
    const response = await request(app).get("/movie?id=1");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(1);
  });

  it("GET Movie by Genre", async () => {
    const response = await request(app).get("/movie?genre=Action");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("GET Movie by Title", async () => {
    const response = await request(app).get("/movie?search=Avengers");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("GET Error if Movie not found By Id", async () => {
    const response = await request(app).get("/movie?id=10000");
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Movie not found");
  });
});
