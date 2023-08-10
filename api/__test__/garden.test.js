const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("Garden MVC", () => {
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

    //GET
    it("Should respond with an error when trying to retrieve a garden which doesn't exist in the db", async () => {
      const response = await request(app)
        .get("/gardens")
        .set({ authorization: token })
        .expect(404);
      const { error } = response.body;
      expect(error).toMatch(/unable/i);
    });

  //POST - SUCCESS
  it("Should create a new garden record entry", async () => {
    const newGardenData = {
      name: "Enchanted Eden",
    };

    const response = await request(app)
      .post("/gardens")
      .set({ authorization: token })
      .send(newGardenData)
      .expect(201);

    const { name, garden_id } = response.body;

    //save garden id for a later test
    gardenId = garden_id;

    expect(name).toBe("Enchanted Eden");
    expect(response.body).toHaveProperty("garden_id");
    expect(response.body).toHaveProperty("soil_quality");
    expect(response.body).toHaveProperty("water_level");
  });

  //POST - ERROR
  it("Should return an error message if conditions for creating a new garden haven't been met", async () => {
    const newGardenData = {
      soil_quality: 50,
    };

    await request(app)
      .post("/gardens")
      .set({ authorization: token })
      .send(newGardenData)
      .expect(412);
  });

  //GET - SUCCESS
  it("Should get user's garden", async () => {
    const response = await request(app)
      .get("/gardens")
      .set({ authorization: token })
      .expect(200);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("weather");
    expect(response.body).toHaveProperty("pest_level");
  });

  //PATCH - SUCCESS
  it("Should update user's garden information with valid details", async () => {
    const updatedGardenInfo = {
      soil_quality: 66,
      weather: 9,
    };

    const response = await request(app)
      .patch(`/gardens`)
      .set({ authorization: token })
      .send(updatedGardenInfo)
      .expect(202);

    const { name, weather, pest_level, soil_quality } = response.body;

    expect(name).toBe("Enchanted Eden");
    expect(pest_level).toBe(0);
    expect(soil_quality).toBe(66);
    expect(weather).toBe(9);
  });

  //PATCH - ERROR
  it("Should respond with an error message if user updates garden information with invalid details", async () => {
    const updatedGardenInfo = {
      soil_quality: -66,
      weather: 900,
    };

    await request(app)
      .patch(`/gardens`)
      .set({ authorization: token })
      .send(updatedGardenInfo)
      .expect(304);
  });

  //DELETE - SUCCESS
  it("Should delete a garden", async () => {
    await request(app)
      .delete(`/gardens`)
      .set({ authorization: token })
      .expect(204);
    await request(app)
      .get(`/gardens`)
      .set({ authorization: token })
      .expect(404);
  });
});
