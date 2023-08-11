const db = require("../database/connect");

class Plant {
  constructor({
    plant_id,
    user_id,
    pet_name,
    plant_name,
    perenual_id,
    soil_moisture,
    soil_fertility,
    sun_light,
    plant_size,
    creation_date,
  }) {
    this.plant_id = plant_id;
    this.user_id = user_id;
    this.pet_name = pet_name;
    this.plant_name = plant_name;
    this.perenual_id = perenual_id;
    this.soil_moisture = soil_moisture;
    this.soil_fertility = soil_fertility;
    this.sun_light = sun_light;
    this.plant_size = plant_size;
    this.creation_date = creation_date;
  }

  //READ ONE - helper
  static async getOneByPlantId(plant_id) {
    const response = await db.query("SELECT * FROM plant WHERE plant_id = $1", [
      plant_id,
    ]);
    if (response.rows.length === 0) {
      throw new Error("Unable to find the plant you're looking for");
    }
    return new Plant(response.rows[0]);
  }

  //READ ONE
  static async getOneOfMyPlants(user_id, plant_id) {
    const plant = await Plant.getOneByPlantId(plant_id);

    if (plant["user_id"] !== user_id) {
      throw new Error(
        "Hold on there buddy, what are you doing with someone else's plant"
      );
    }
    return plant;
  }

  //READ ALL
  static async getAllMyPlants(user_id) {
    const response = await db.query(
      "SELECT * FROM plant WHERE user_id = $1 ORDER BY creation_date;",
      [user_id]
    );
    return response.rows.map((o) => new Plant(o));
  }

  //CREATE ONE
  static async createAPlant(user_id, { pet_name, plant_name, perenual_id }) {
    const values = [user_id, pet_name, plant_name, perenual_id];
    const response = await db.query(
      "INSERT INTO plant (user_id, pet_name, plant_name, perenual_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      values
    );
    return new Plant(response.rows[0]);
  }

  //UPDATE ONE
  async updateThisPlant({
    pet_name = this.pet_name,
    soil_moisture = this.soil_moisture,
    soil_fertility = this.soil_fertility,
    sun_light = this.sun_light,
    plant_size = this.plant_size,
  }) {

    const values = [
      pet_name,
      soil_moisture,
      soil_fertility,
      sun_light,
      plant_size,
      this.plant_id,
    ];

    const response = await db.query(
      "UPDATE plant SET pet_name = $1, soil_moisture = $2, soil_fertility = $3, sun_light = $4, plant_size = $5 WHERE plant_id = $6 RETURNING *;",
      values
    );
    return new Plant(response.rows[0]);
  }

  //DELETE ONE
  async deleteThisPlant() {
    const response = await db.query(
      "DELETE FROM plant WHERE plant_id = $1 RETURNING *;",
      [this.plant_id]
    );
    return new Plant(response.rows[0]);
  }
}

module.exports = Plant;
