const db = require("../database/connect");

class Animal {
  constructor({ animal_id, user_id, name, wellbeing, influence }) {
    this.animal_id = animal_id;
    this.user_id = user_id;
    this.name = name;
    this.wellbeing = wellbeing;
    this.influence = influence;
  }

  //READ ONE - helper
  static async getOneByAnimalId(animal_id) {
    const response = await db.query(
      "SELECT * FROM animal WHERE animal_id = $1",
      [animal_id]
    );
    if (response.rows.length === 0) {
      throw new Error("Unable to find the animal you're looking for");
    }
    return new Animal(response.rows[0]);
  }

  //READ ONE
  static async getOneOfMyAnimals(user_id, animal_id) {
    const animal = await Animal.getOneByAnimalId(animal_id);

    if (animal["user_id"] !== user_id) {
      throw new Error("This isn't one of your animals");
    }
    return animal;
  }

  //READ ALL
  static async getAllMyAnimals(user_id) {
    const response = await db.query(
      "SELECT * FROM animal WHERE user_id = $1 ORDER BY animal_id;",
      [user_id]
    );
    return response.rows.map((a) => new Animal(a));
  }

  //CREATE ONE
  static async createAnAnimal(user_id, { name, influence }) {
    const values = [user_id, name, influence];

    const response = await db.query(
      "INSERT INTO animal (user_id, name, influence) VALUES ($1, $2, $3) RETURNING *;",
      values
    );
    return new Animal(response.rows[0]);
  }

  //UPDATE ONE
  async updateThisAnimal({
    name = this.name,
    wellbeing = this.wellbeing,
    influence = this.influence,
  }) {
    const values = [name, wellbeing, influence, this.animal_id];
    const response = await db.query(
      "UPDATE animal SET name = $1, wellbeing = $2, influence = $3 WHERE animal_id = $4 RETURNING *;",
      values
    );
    return new Animal(response.rows[0]);
  }

  //DELETE ONE
  async deleteThisAnimal() {
    const response = await db.query(
      "DELETE FROM animal WHERE animal_id = $1 RETURNING *;",
      [this.animal_id]
    );
    return new Animal(response.rows[0]);
  }
}

module.exports = Animal;
