const Animal = require("../models/Animal");
const authenticator = require("../middleware/authenticator");

class AnimalController {
  //READ ALL
  static async getAllMyAnimals(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = await Animal.getAllMyAnimals(user_id);
    res.status(200).json(data);
  }

  //READ ONE
  static async getOneOfMyAnimals(req, res) {
    const user_id = req.tokenObj.user_id;
    const animal_id = req.params.id;
    try {
      const result = await Animal.getOneOfMyAnimals(user_id, animal_id);
      res.status(200).send(result);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  //CREATE ONE
  static async createAnAnimal(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const data = req.body;
      const result = await Animal.createAnAnimal(user_id, data);
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
      switch (String(error.code)) {
        case "23502":
          res.status(412).json({
            error: "You must give your animal a type",
          });
          break;
        case "22P02":
          res.status(412).json({ error: "Invalid animal name" });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  }

  //UPDATE ONE
  static async updateThisAnimal(req, res) {
    const user_id = req.tokenObj.user_id;
    const animal_id = req.params.id;
    const data = req.body;
    try {
      const animal = await Animal.getOneOfMyAnimals(user_id, animal_id);
      const result = await animal.updateThisAnimal(data);
      res.status(202).send(result);
    } catch (error) {
      // console.log(error);
      res.status(304).json({ error: error.message });
    }
  }

  //DELETE ONE
  static async deleteThisAnimal(req, res) {
    const user_id = req.tokenObj.user_id;
    const animal_id = req.params.id;
    try {
      const animal = await Animal.getOneOfMyAnimals(user_id, animal_id);
      await animal.deleteThisAnimal();
      res.status(204).end();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnimalController;
