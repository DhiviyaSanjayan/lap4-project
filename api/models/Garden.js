const db = require("../database/connect");

class Garden {
    constructor({ garden_id, user_id, name, weather, soil_quality, pest_level, water_level }) {
      this.id = garden_id;
      this.user_id = user_id;
      this.name = name;
      this.weather = weather;
      this.soil_quality = soil_quality;
      this.pest_level = pest_level;
      this.water_level =  water_level;
    }

    static async getAll(user_id) {
        const response = await db.query("SELECT * FROM garden WHERE user_id = $1 ORDER BY garden_id;", [
          user_id,
      ]);
        return response.rows.map((g) => new Garden(g));
      }
    
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM garden WHERE garden_id = $1;", [
            id,
        ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate garden.");
        }
        return new Garden(response.rows[0]);
      }
    
    static async create(data) {
        const { user_id, name, weather, soil_quality, pest_level, water_level } = data;
        const response = await db.query(
          "INSERT INTO garden (user_id, name, weather, soil_quality, pest_level, water_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
          [user_id, name, weather, soil_quality, pest_level, water_level]
        );
    
        return new Garden(response.rows[0]);
      }
      
    async update(data) {
        const { name, weather, soil_quality, pest_level, water_level } = data;
        const response = await db.query(
          "UPDATE garden SET name = $1, weather = $2, soil_quality = $3, pest_level = $4, water_level = $5 WHERE garden_id = $6 RETURNING *;",
          [name, weather, soil_quality, pest_level, water_level, this.id]
        );
    
        if (response.rows.length !== 1) {
          throw new Error("Unable to update garden.");
        }
    
        return new Garden(response.rows[0]);
      }
      
    async destroy() {
        try {
          const response = await db.query("DELETE FROM garden WHERE garden_id = $1;", [
            this.id,
          ]);
          if (response.rowCount === 0) {
            throw new Error("Garden not found.");
          }
          return { deleted: true };
        } catch (err) {
          console.error("Error during database query:", err);
          throw new Error("Failed to delete the garden.");
        }
      }
        

}    


module.exports = Garden;