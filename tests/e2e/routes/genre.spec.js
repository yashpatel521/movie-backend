const request = require("supertest");
const app = require("../../../src/app");
const utils = require("../../utils");

describe("Genres Routes", () => {
  beforeEach(async () => {
    await utils.initializeDB();
    await utils.addDummyData();
  });

  it("GET All Genres", async () => {
    const response = await request(app).get("/genre");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
