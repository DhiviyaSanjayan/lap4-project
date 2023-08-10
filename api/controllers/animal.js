const Animal = require("../models/Animal");

class AnimalController {
  static async getAllAnimals(req, res) {
    try {
      const allAnimals = await Animal.getAllAnimals();
      res.status(200).json(allAnimals);
    } catch (error) {
      console.error("Error fetching all animals:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async createAnimal(req, res) {
    try {
      const data = req.body;
      const result = await Animal.createAnimal(data);
      res.status(201).send(result);
    } catch (error) {
      console.error("Animal creation error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAnimalDetails(req, res) {
    const animal_id = req.params.id;
    try {
      const result = await Animal.getAnimalById(animal_id);
      res.status(200).send(result);
    } catch (error) {
      console.error("Animal details error:", error);
      res.status(404).json({ error: error.message });
    }
  }

  static async updateAnimal(req, res) {
    const animal_id = req.params.id;
    const data = req.body;
    try {
      const result = await Animal.updateAnimal(animal_id, data);
      res.status(200).send(result);
    } catch (error) {
      console.error("Animal update error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAnimal(req, res) {
    const animal_id = req.params.id;
    try {
      const result = await Animal.deleteAnimal(animal_id);
      res.status(200).send(result);
    } catch (error) {
      console.error("Animal deletion error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnimalController;
