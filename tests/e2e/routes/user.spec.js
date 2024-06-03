const request = require("supertest");
const app = require("../../../src/app");
const utils = require("../../utils");
const db = require("../../../src/database/db");

describe("User Routes", () => {
  beforeEach(async () => {
    await utils.initializeDB();
    await utils.clearAllTables();
  });

  it("should create a new user", async () => {
    const user = {
      username: "test user",
      email: "testuser@user.com",
      password: "Test1234",
    };

    const response = await request(app).post("/user/register").send(user);
    expect(response.statusCode).toBe(200);

    const dbUser = await utils.getRecordFromDB(
      "user",
      "username",
      user.username
    );
    expect(response.body.status).toBe(true);
    expect(dbUser).toMatchObject(response.body.data);
  });

  it("should not create a new user", async () => {
    const user = {
      username: "test user",
      email: "testuser@user.com",
      password: "User1234",
    };
    // First, create a user
    await request(app).post("/user/register").send(user);

    // Then, try to create another user with the same email
    const response = await request(app).post("/user/register").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(false);
  });

  it("should login a user", async () => {
    const user = {
      username: "user 3",
      email: "user3@user.com",
      password: "User1234",
    };
    await request(app).post("/user/register").send(user);
    const response = await request(app).post("/user/login").send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.username).toBe(user.username);
  });

  it("should not login a user", async () => {
    const user = {
      username: "user 3",
      email: "user3@user.com",
      password: "temp1234",
    };
    const response = await request(app).post("/user/login").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(false);
  });
});
