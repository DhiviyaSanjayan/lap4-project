const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("Display MVC", () => {
  let token;
  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB();
    token = await getValidToken("user1", "1");
  });

  afterAll(async () => {
    // Close the database connection
    await db.end();
  });

  // //POST - SUCCESS
  // it("Should create a new display record entry", async () => {
  //   const newDisplayData = {
  //     name: "Enchanted Eden",
  //   };

  //   const response = await request(app)
  //     .post("/displays")
  //     .set({ authorization: token })
  //     .send(newDisplayData)
  //     .expect(201);

  //   const { name } = response.body;

  //   expect(name).toBe("Enchanted Eden");
  //   expect(response.body).toHaveProperty("display_id");
  //   expect(response.body).toHaveProperty("weather");
  // });

  //POST - ERROR
  it("Should return an error message if conditions for creating a new display haven't been met", async () => {
    const newDisplayData = {
      weather: 4,
    };

    await request(app)
      .post("/displays")
      .set({ authorization: token })
      .send(newDisplayData)
      .expect(412);
  });

  //GET - SUCCESS
  it("Should get user's display", async () => {
    const response = await request(app)
      .get("/displays")
      .set({ authorization: token })
      .expect(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("pest_level");
  });

  //PATCH - SUCCESS
  it("Should update user's display information with valid details", async () => {
    const updatedDisplayInfo = {
      weather: 4,
      capacity: 10,
    };

    const response = await request(app)
      .patch(`/displays`)
      .set({ authorization: token })
      .send(updatedDisplayInfo)
      .expect(202);

    const { name, pest_level, weather, capacity } = response.body;

    expect(name).toMatch(/garden/i);
    expect(pest_level).toBe(0);
    expect(weather).toBe(4);
    expect(capacity).toBe(10);
  });

  //PATCH - ERROR
  it("Should respond with an error message if user updates display information with invalid details", async () => {
    const updatedDisplayInfo = {
      weather: -6,
    };

    await request(app)
      .patch(`/displays`)
      .set({ authorization: token })
      .send(updatedDisplayInfo)
      .expect(304);
  });

  //DELETE - SUCCESS
  it("Should delete a display", async () => {
     await request(app)
      .delete(`/displays`)
      .set({ authorization: token })
      .expect(204);
    
    await request(app)
      .get(`/displays`)
      .set({ authorization: token })
      .expect(404);
  });
});
