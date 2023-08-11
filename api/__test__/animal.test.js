const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("Animal MVC", () => {
  let token;
  let tokenOther;
  let animalId;

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
  it("Should respond with an error when trying to retrieve a animal which doesn't exist in the db", async () => {
    const response = await request(app)
      .get("/animals/1")
      .set({ authorization: token })
      .expect(404);
    const { error } = response.body;
    expect(error).toMatch(/unable/i);
  });

  //POST - SUCCESS
  it("Should create a new animal record entry", async () => {
    const newAnimalData = {
      name: "Bee",
      influence: "65",
    };

    const response = await request(app)
      .post("/animals")
      .set({ authorization: token })
      .send(newAnimalData)
      .expect(201);

    const { name, animal_id } = response.body;

    //save animal id for a later test
    animalId = animal_id;

    expect(name).toBe("Bee");
    expect(response.body).toHaveProperty("influence");
    expect(response.body).toHaveProperty("wellbeing");
  });

  //POST - ERROR
  it("Should return an error message if conditions for creating a new animal haven't been met", async () => {
    const newAnimalData = {
      name: "Snail",
    };

    await request(app)
      .post("/animals")
      .set({ authorization: token })
      .send(newAnimalData)
      .expect(412);
  });

  //GET - SUCCESS
  it("Should get all of user's animals", async () => {
    const response = await request(app)
      .get("/animals")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //GET - SUCCESS
  it("Should get the animal that has been created", async () => {
    const response = await request(app)
      .get(`/animals/${animalId}`)
      .set({ authorization: token })
      .expect(200);

    const { name } = response.body;
    expect(name).toBe("Bee");
    expect(response.body).toHaveProperty("wellbeing");
  });

  //GET - ERROR
  it("Should get an error if you try to access another user's animal", async () => {
    //another user is creates a new animal and it's id is obtained
    const newAnimalData2 = {
      name: "Bird",
      influence: 20,
    };
    const newAnimalId = (
      await request(app)
        .post("/animals")
        .set({ authorization: tokenOther })
        .send(newAnimalData2)
        .expect(201)
    ).body.animal_id;

    const response = await request(app)
      .get(`/animals/${newAnimalId}`)
      .set({ authorization: token });

    const { error } = response.body;
    expect(error).toMatch(/isn't/i);
  });

  //PATCH - SUCCESS
  it("Should update user's animal information with valid details", async () => {
    const updatedAnimalInfo = {
      name: "Lady Bug",
      wellbeing: 44,
    };

    const response = await request(app)
      .patch(`/animals/${animalId}`)
      .set({ authorization: token })
      .send(updatedAnimalInfo)
      .expect(202);

    const { name, wellbeing } = response.body;

    expect(name).toBe("Lady Bug");
    expect(wellbeing).toBe(44);
  });

  //PATCH - ERROR
  it("Should respond with an error message if user updates animal information with invalid details", async () => {
    const updatedAnimalInfo = {
      // values over 100 exceed the max
      wellbeing: 144,
    };

    await request(app)
      .patch(`/animals/${animalId}`)
      .set({ authorization: token })
      .send(updatedAnimalInfo)
      .expect(304);
  });

  //DELETE - SUCCESS
  it("Should delete a animal", async () => {
    await request(app)
      .delete(`/animals/${animalId}`)
      .set({ authorization: token })
      .expect(204);
    await request(app)
      .get(`/animals/${animalId}`)
      .set({ authorization: token })
      .expect(404);
  });
});
