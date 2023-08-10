const request = require("supertest");
const app = require("../app");
const db = require("../database/connect");
const getValidToken = require("./utils/getValidToken");
const setupMockDB = require("./mock/database/setup");

describe("Animal MVC", () => {
  let token;
  let animalId;

  beforeAll(async () => {
    await setupMockDB();
    token = await getValidToken("user1", "1");
  });

  afterAll(async () => {
    await db.end();
  });

  // POST
  it("Should create a new animal record entry", async () => {
    const newAnimalData = {
      name: "bird",
      wellbeing: 100,
      influence: 10,
    };

    const response = await request(app)
      .post("/animals")
      .set({ authorization: token })
      .send(newAnimalData)
      .expect(201);

    const { animal_id, name } = response.body;

    // Save animal id for a later test
    animalId = animal_id;

    expect(name).toBe("bird");
    expect(response.body).toHaveProperty("wellbeing");
    expect(response.body).toHaveProperty("influence");
  });

  // GET
  it("Should get all of user's animals", async () => {
    const response = await request(app)
      .get("/animals")
      .set({ authorization: token })
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // GET
  it("Should get the animal that has been created", async () => {
    const response = await request(app)
      .get(`/animals/${animalId}`)
      .set({ authorization: token })
      .expect(200);

    const { name } = response.body;
    expect(name).toBe("bird");
  });

  // PATCH
  it("Should update user's animal information with valid details", async () => {
    const updatedAnimalInfo = {
      name: "parrot",
      wellbeing: 90,
    };

    const response = await request(app)
      .patch(`/animals/${animalId}`)
      .set({ authorization: token })
      .send(updatedAnimalInfo)
      .expect(200);

    const { name, wellbeing } = response.body;

    expect(name).toBe("parrot");
    expect(wellbeing).toBe(90);
  });

  // DELETE
  it("Should delete an animal", async () => {
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
