const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("Plant MVC", () => {
  let token;
  let tokenOther;
  let plantId;

  beforeAll(async () => {
    //Set the database to it's default state before starting test
    await setupMockDB();
    token = await getValidToken("user1", "1");
    tokenOther = await getValidToken("user2", "2");
  });

  afterAll(async () => {
    // Close the database connection
    await db.end();
  });

  //GET
  it("Should respond with an error when trying to retrieve a plant which doesn't exist in the db", async () => {
    const response = await request(app)
      .get("/plants/1")
      .set({ authorization: token })
      .expect(404);
    const { error } = response.body;
    expect(error).toMatch(/unable/i);
  });

  //POST - SUCCESS
  it("Should create a new plant record entry", async () => {
    const newPlantData = {
      nickname: "Jason",
      name: "Rubus arcticus",
      trefle_id: 266630,
    };

    const response = await request(app)
      .post("/plants")
      .set({ authorization: token })
      .send(newPlantData)
      .expect(201);

    const { plant_id, nickname, name } = response.body;

    //save plant id for a later test
    plantId = plant_id;

    expect(name).toBe("Rubus arcticus");
    expect(nickname).toBe("Jason");
    expect(response.body).toHaveProperty("plant_id");
    expect(response.body).toHaveProperty("water_satisfaction");
    expect(response.body).toHaveProperty("creation_date");
  });

  //POST - ERROR
  it("Should return an error message if conditions for creating a new plant haven't been met", async () => {
    const newPlantData = {
      name: "Rubus arcticus",
      trefle_id: 266630,
    };

    await request(app)
      .post("/plants")
      .set({ authorization: token })
      .send(newPlantData)
      .expect(412);
  });

  //GET - SUCCESS
  it("Should get all of user's plants", async () => {
    const response = await request(app)
      .get("/plants")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //GET - SUCCESS
  it("Should get the plant that has been created", async () => {
    const response = await request(app)
      .get(`/plants/${plantId}`)
      .set({ authorization: token })
      .expect(200);

    const { name, nickname } = response.body;
    expect(name).toBe("Rubus arcticus");
    expect(nickname).toBe("Jason");
  });

  //GET - ERROR
  it("Should get an error if you try to access another user's plant", async () => {
    //another user is creates a new plant and it's id is obtained
    const newPlantData2 = {
      nickname: "Felix",
      name: "Rubus arcticus",
      trefle_id: 266630,
    };
    const newPlantId = (
      await request(app)
        .post("/plants")
        .set({ authorization: tokenOther })
        .send(newPlantData2)
        .expect(201)
    ).body.plant_id;

    const response = await request(app)
      .get(`/plants/${newPlantId}`)
      .set({ authorization: token });

    const { error } = response.body;
    expect(error).toMatch(/hold on/i);
  });

  //PATCH - SUCCESS
  it("Should update user's plant information with valid details", async () => {
    const updatedPlantInfo = {
      nickname: "Barbara",
      water_satisfaction: 44,
    };

    const response = await request(app)
      .patch(`/plants/${plantId}`)
      .set({ authorization: token })
      .send(updatedPlantInfo)
      .expect(202);

    const {
      nickname,
      wellbeing_rating,
      water_satisfaction,
      light_satisfaction,
    } = response.body;

    expect(nickname).toBe("Barbara");
    expect(water_satisfaction).toBe(44);
    expect(wellbeing_rating).toBeLessThan(100);
    expect(light_satisfaction).toBe(100);
  });

  //PATCH - ERROR
  it("Should respond with an error message if user updates plant information with invalid details", async () => {
    const updatedPlantInfo = {
      // values over 100 exceed the max
      air_satisfaction: 184,
      water_satisfaction: -44,
    };

    await request(app)
      .patch(`/plants/${plantId}`)
      .set({ authorization: token })
      .send(updatedPlantInfo)
      .expect(304);
  });

  //DELETE - SUCCESS
  it("Should delete a plant", async () => {
    await request(app)
      .delete(`/plants/${plantId}`)
      .set({ authorization: token })
      .expect(204);
    await request(app)
      .get(`/plants/${plantId}`)
      .set({ authorization: token })
      .expect(404);
  });
});
