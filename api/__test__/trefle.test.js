const request = require("supertest");
const app = require("../app");

describe("Trefle API Endpoint", () => {
  //GET - SUCCESS
  it("Should respond with a JSON object with plant information", async () => {
    const body = {
      flower_color: "yellow",
      foliage_color: "green",
      foliage_texture: "fine",
    };
    const response = await request(app)
      .post("/trefle/plant/find")
      .send(body)
      .expect(200);

    const { data } = response.body;
    expect(data[0]).toHaveProperty("scientific_name");
  });
});
