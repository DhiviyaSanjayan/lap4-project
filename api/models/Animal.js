const db = require("../database/connect");

class Animal {
  constructor({ animal_id, user_id, name, wellbeing, influence }) {
    this.animal_id = animal_id;
    this.user_id = user_id;
    this.name = name;
    this.wellbeing = wellbeing;
    this.influence = influence;
  }

  static async getAllAnimals(user_id) {
    try {
      const response = await db.query(
        "SELECT * FROM animal WHERE user_id = $1 ORDER BY animal_id;",
        [user_id]
      );
      return response.rows.map((a) => new Animal(a));
    } catch (error) {
      throw error;
    }
  }

  static async getAnimalById(animal_id) {
    const response = await db.query(
      "SELECT * FROM animal WHERE animal_id = $1",
      [animal_id]
    );
    if (response.rows.length !== 1) {
      throw new Error("Animal with this ID doesn't exist");
    }
    return new Animal(response.rows[0]);
  }

  static async createAnimal(data) {
    const { user_id, name, wellbeing, influence } = data;
    try {
      const response = await db.query(
        "INSERT INTO animal (user_id, name, wellbeing, influence) VALUES ($1, $2, $3, $4) RETURNING animal_id;",
        [user_id, name, wellbeing, influence]
      );
      const newId = response.rows[0].animal_id;
      const newAnimal = await Animal.getAnimalById(newId);

      return newAnimal;
    } catch (error) {
      throw error;
    }
  }

  static async updateAnimal(animal_id, data) {
    const { name, wellbeing, influence } = data;
    try {
      const response = await db.query(
        "UPDATE animal SET name = $1, wellbeing = $2, influence = $3 WHERE animal_id = $4 RETURNING *;",
        [name, wellbeing, influence, animal_id]
      );
      if (response.rows.length !== 1) {
        throw new Error("Animal with this ID doesn't exist");
      }
      return new Animal(response.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async deleteAnimal(animal_id) {
    try {
      const response = await db.query(
        "DELETE FROM animal WHERE animal_id = $1 RETURNING *;",
        [animal_id]
      );
      if (response.rows.length !== 1) {
        throw new Error("Animal with this ID doesn't exist");
      }
      return new Animal(response.rows[0]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Animal;
