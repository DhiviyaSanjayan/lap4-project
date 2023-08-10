const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("User MVC", () => {
  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB();
  });
  afterAll(async () => {
    // Close the database connection
    await db.end();
  });

  let token;
  const registerDetails = {
    username: "user",
    password: "password",
  };

  //POST - SUCCESS
  it("Should register user to app", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(201);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", "user");
  });

  //POST - ERROR
  it("Should give an error if user tries to register again with the same details", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(registerDetails)
      .expect(500);

    let { error } = response.body;

    expect(error).toBe("A user with this username already exists");
  });

  //POST - SUCCESS
  it("Should return a token after logging in", async () => {
    const response = await request(app)
      .post("/users/login")
      .send(registerDetails)
      .expect(201);

    const userObj = response.body;
    expect(userObj).toHaveProperty("token");
    token = userObj.token;
  });

  //POST - ERROR
  it("Should return error if user gives an incorrect username", async () => {
    await request(app)
      .post("/users/login")
      .send({
        username: "user1",
        password: "password",
      })
      .expect(403);
  });

  //POST - ERROR
  it("Should return error if user gives an incorrect password", async () => {
    await request(app)
      .post("/users/login")
      .send({
        username: "user",
        password: "pass",
      })
      .expect(403);
  });

  //GET - ERROR
  it("Should return an error message if the user tries to get their profile details without a valid token or one at all", async () => {
    const response1 = await request(app)
      .get("/users/details")
      .set({ authorization: "asdf" })
      .expect(403);

    console.log(response1.body)
    let { error } = response1.body;
    expect(error).toBeDefined();

    const response2 = await request(app).get("/users/details").expect(403);

    ({ error } = response2.body);
    expect(error).toBeDefined();
  });

  //GET - SUCCESS
  it("Should get user details after being created", async () => {
    const response = await request(app)
      .get("/users/details")
      .set({ authorization: token })
      .expect(200);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", "user");
  });

  //PATCH - SUCCESS
  it("Should update user details", async () => {
    const accountDetails = {
      exp: 6030,
      coins: 9000,
    };
    const response = await request(app)
      .patch("/users/update")
      .set({ authorization: token })
      .send(accountDetails)
      .expect(202);

    const userObj = response.body;
    expect(userObj).toHaveProperty("username", registerDetails.username);
    expect(userObj.exp).toBe(6030);
    expect(userObj.coins).toBe(9000);
  });

  //DELETE - SUCCESS
  it("Should logout", async () => {
    await request(app)
      .delete("/users/logout")
      .set({ authorization: token })
      .expect(202);
  });

  //DELETE - SUCCESS
  it("Should delete an account", async () => {
    token = await getValidToken("user5", "1");
    await request(app)
      .get(`/users/details`)
      .set({ authorization: token })
      .expect(200);
    await request(app)
      .delete("/users")
      .set({ authorization: token })
      .expect(204);
    //because delete users endpoint removes all tokens you get a "not authenticated" 403 forbidden error
    await request(app)
      .get(`/users/details`)
      .set({ authorization: token })
      .expect(403);
  });
});
