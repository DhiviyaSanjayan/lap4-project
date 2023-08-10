const request = require("supertest");
const app = require("../app");

describe("Trefle API Endpoint", () => {
  //GET - SUCCESS
  it("Should respond with a JSON object with plant informatin", async () => {
    const response = await request(app).get("/trefle-api/plants").expect(200);

    const { data } = response.body;
    expect(data[0]).toHaveProperty("scientific_name");
  });

  //GET - ERROR
  it("Should respond with an error when trying to access an invalid endpoint", async () => {
    await request(app).get("/trefle-api/plants/-1").expect(404);
  });
});
