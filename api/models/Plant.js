const db = require("../database/connect");

class Plant {
  constructor({
    plant_id,
    user_id,
    nickname,
    name,
    trefle_id,
    wellbeing_rating,
    water_satisfaction,
    air_satisfaction,
    nutrient_satisfaction,
    light_satisfaction,
    space_satisfaction,
    creation_date,
    last_update_date,
  }) {
    this.plant_id = plant_id;
    this.user_id = user_id;
    this.nickname = nickname;
    this.name = name;
    this.trefle_id = trefle_id;
    this.wellbeing_rating = wellbeing_rating;
    this.water_satisfaction = water_satisfaction;
    this.air_satisfaction = air_satisfaction;
    this.nutrient_satisfaction = nutrient_satisfaction;
    this.light_satisfaction = light_satisfaction;
    this.space_satisfaction = space_satisfaction;
    this.creation_date = creation_date;
    this.last_update_date = last_update_date;
  }

  //READ - helper
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
  static async getOneOfMyPlantsByPlantId(user_id, plant_id) {
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
  static async createAPlant(user_id, { nickname, name, trefle_id }) {
    const values = [user_id, nickname, name, trefle_id];
    const response = await db.query(
      "INSERT INTO plant (user_id, nickname, name, trefle_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      values
    );
    const plantId = response.rows[0].plant_id;
    const newPlant = await Plant.getOneByPlantId(plantId);
    return newPlant;
  }

  //UPDATE ONE
  async updateMyPlant({
    nickname = this.nickname,
    water_satisfaction = this.water_satisfaction,
    air_satisfaction = this.air_satisfaction,
    nutrient_satisfaction = this.nutrient_satisfaction,
    light_satisfaction = this.light_satisfaction,
    space_satisfaction = this.space_satisfaction,
  }) {
    this.calcWellbeingRating()
    const values = [
      nickname,
      this.wellbeing_rating,
      water_satisfaction,
      air_satisfaction,
      nutrient_satisfaction,
      light_satisfaction,
      space_satisfaction,
      this.user_id,
    ];
    const response = await db.query(
      "UPDATE plant SET nickname = $1, wellbeing_rating = $2, water_satisfaction = $3, air_satisfaction = $4, nutrient_satisfaction = $5, light_satisfaction = $6, space_satisfaction = $7, last_update_date = CURRENT_TIMESTAMP WHERE user_id = $8 RETURNING *; ",
      values
    );
    const plantId = response.rows[0].plant_id;
    const updatedPlant = await Plant.getOneByPlantId(plantId);
    return updatedPlant;
  }

  //DELETE ONE
  async deleteMyPlant() {
    const response = await db.query(
      "DELETE FROM plant WHERE plant_id = $1 RETURNING *;",
      [this.plant_id]
    );
    return new Plant(response.rows[0]);
  }

  //calculate new wellbeing rating based on condition satisfaction ratings
  calcWellbeingRating() {
    const waterWeight = 0.3 * this.water_satisfaction;
    const airWeight = 0.1 * this.air_satisfaction;
    const nutrientWeight = 0.3 * this.nutrient_satisfaction;
    const lightWeight = 0.2 * this.light_satisfaction;
    const spaceWeight = 0.1 * this.space_satisfaction;
    this.wellbeing_rating = waterWeight + airWeight + nutrientWeight + lightWeight + spaceWeight;
  }
}

module.exports = Plant;
