const db = require("../database/connect");

class Display {
  constructor({ display_id, user_id, name, capacity, weather, pest_level }) {
    this.display_id = display_id;
    this.user_id = user_id;
    this.name = name;
    this.capacity = capacity;
    this.weather = weather;
    this.pest_level = pest_level;
  }

  //READ ONE
  static async getMyDisplay(user_id) {
    const response = await db.query(
      "SELECT * FROM display WHERE user_id = $1;",
      [user_id]
    );
    if (response.rows.length === 0) {
      throw new Error("Unable to locate your display");
    }
    return new Display(response.rows[0]);
  }

  //CREATE ONE
  static async createMyDisplay(user_id, { name }) {
    const values = [user_id, name];
    const response = await db.query(
      "INSERT INTO display (user_id, name) VALUES ($1, $2) RETURNING *;",
      values
    );
    return new Display(response.rows[0]);
  }

  //UPDATE ONE
  async updateThisDisplay({
    name = this.name,
    capacity = this.capacity,
    weather = this.weather,
    pest_level = this.pest_level,
  }) {
    const values = [name, capacity, weather, pest_level, this.display_id];
    const response = await db.query(
      "UPDATE display SET name = $1, capacity = $2, weather = $3, pest_level = $4 WHERE display_id = $5 RETURNING *;",
      values
    );

    return new Display(response.rows[0]);
  }

  //DELETE ONE
  async deleteThisDisplay() {
    const response = await db.query(
      "DELETE FROM display WHERE display_id = $1 RETURNING *;",
      [this.display_id]
    );
    return new Display(response.rows[0]);
  }
}

module.exports = Display;
