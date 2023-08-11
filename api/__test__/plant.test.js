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
      pet_name: "Jason",
      plant_name: "Rubus arcticus",
      perenual_id: 2660,
    };

    const response = await request(app)
      .post("/plants")
      .set({ authorization: token })
      .send(newPlantData)
      .expect(201);

    console.log(response.body);
    const { plant_id, pet_name, plant_name } = response.body;

    //save plant id for a later test
    plantId = plant_id;

    expect(plant_name).toBe("Rubus arcticus");
    expect(pet_name).toBe("Jason");
    expect(response.body).toHaveProperty("plant_id");
    expect(response.body).toHaveProperty("soil_moisture");
    expect(response.body).toHaveProperty("creation_date");
  });

  //POST - ERROR
  it("Should return an error message if conditions for creating a new plant haven't been met", async () => {
    const newPlantData = {
      plant_name: "Rubus arcticus",
      perenual_id: 266630,
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

    const { plant_name, pet_name } = response.body;
    expect(plant_name).toBe("Rubus arcticus");
    expect(pet_name).toBe("Jason");
  });

  //GET - ERROR
  it("Should get an error if you try to access another user's plant", async () => {
    //another user is creates a new plant and it's id is obtained
    const newPlantData2 = {
      pet_name: "Felix",
      plant_name: "Rubus arcticus",
      perenual_id: 26663,
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
      pet_name: "Barbara",
      soil_moisture: 44,
    };

    const response = await request(app)
      .patch(`/plants/${plantId}`)
      .set({ authorization: token })
      .send(updatedPlantInfo)
      .expect(202);

    const { pet_name, soil_moisture, wellbeing } = response.body;

    expect(pet_name).toBe("Barbara");
    expect(soil_moisture).toBe(44);
    expect(wellbeing).toBe(100);
  });

  //PATCH - ERROR
  it("Should respond with an error message if user updates plant information with invalid details", async () => {
    const updatedPlantInfo = {
      soil_moisture: -44,
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
