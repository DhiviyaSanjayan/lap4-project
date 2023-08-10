const db = require("../database/connect");

class Garden {
  constructor({
    garden_id,
    user_id,
    name,
    weather,
    soil_quality,
    pest_level,
    water_level,
  }) {
    this.garden_id = garden_id;
    this.user_id = user_id;
    this.name = name;
    this.weather = weather;
    this.soil_quality = soil_quality;
    this.pest_level = pest_level;
    this.water_level = water_level;
  }

  //READ ONE
  static async getMyGarden(user_id) {
    const response = await db.query(
      "SELECT * FROM garden WHERE user_id = $1;",
      [user_id]
    );
    if (response.rows.length === 0) {
      throw new Error("Unable to locate your garden");
    }
    return new Garden(response.rows[0]);
  }

  //CREATE ONE
  static async createMyGarden(user_id, { name }) {
    const values = [user_id, name];
    const response = await db.query(
      "INSERT INTO garden (user_id, name) VALUES ($1, $2) RETURNING *;",
      values
    );
    return new Garden(response.rows[0]);
  }

  //UPDATE ONE
  async updateThisGarden({
    name = this.name,
    weather = this.weather,
    soil_quality = this.soil_quality,
    pest_level = this.pest_level,
    water_level = this.water_level,
  }) {
    const values = [name, weather, soil_quality, pest_level, water_level];
    console.log([...values, this.garden_id])
    const response = await db.query(
      "UPDATE garden SET name = $1, weather = $2, soil_quality = $3, pest_level = $4, water_level = $5 WHERE garden_id = $6 RETURNING *;",
      [...values, this.garden_id]
    );

    return new Garden(response.rows[0]);
  }

  //DELETE ONE
  async deleteThisGarden() {
    const response = await db.query(
      "DELETE FROM garden WHERE garden_id = $1 RETURNING *;",
      [this.garden_id]
    );
    return new Garden(response.rows[0]);
  }
}

module.exports = Garden;
