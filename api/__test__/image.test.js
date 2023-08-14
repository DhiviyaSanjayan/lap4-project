const request = require("supertest");
const app = require("../app");

describe("ImageEndpoint", () => {
  //GET - SUCCESS
  it("Should respond with a JSON object with plant information", async () => {
    await request(app).get("/images/cartoon--rose.png").expect(200);
  });
  //GET - ERROR
  it("Should respond with an error when trying to retrieve a plant which doesn't exist in the db", async () => {
    await request(app).get("/images/carton--rose.png").expect(404);
  });
});
