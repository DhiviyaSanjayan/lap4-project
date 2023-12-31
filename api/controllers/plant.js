const Plant = require("../models/Plant");

class PlantController {
  //READ ALL
  static async getAllMyPlants(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = await Plant.getAllMyPlants(user_id);
    res.status(200).json(data);
  }

  //READ ONE
  static async getOneOfMyPlants(req, res) {
    const user_id = req.tokenObj.user_id;
    const plant_id = req.params.id;
    try {
      const data = await Plant.getOneOfMyPlants(user_id, plant_id);
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  //CREATE ONE
  static async createAPlant(req, res) {
    const user_id = req.tokenObj.user_id;
    const plantInfo = req.body;
    try {
      const pic_filename = req.file?.filename;
      if (!pic_filename) {
        res.status(412).json({
          error: "You're missing an image of your plant",
        });
        return;
      }
      const data = await Plant.createAPlant(user_id, {
        pic_filename,
        ...plantInfo,
      });
      res.status(201).json(data);
    } catch (error) {
      // console.log(error);
      switch (+error.code) {
        case 23502:
          res.status(412).json({
            error:
              "You must give your plant a pet_name, plant_name and perenual_id",
          });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  }

  //UPDATE ONE
  static async updateThisPlant(req, res) {
    const plant_id = req.params.id;
    const user_id = req.tokenObj.user_id;
    let plantInfo = req.body;
    const pic_filename = req.file?.filename;
    plantInfo = { ...plantInfo, pic_filename };
    try {
      const plant = await Plant.getOneOfMyPlants(user_id, plant_id);
      const data = await plant.updateThisPlant(plantInfo);
      res.status(202).json(data);
    } catch (error) {
      // console.log(error);
      res.status(304).json({ error: error.message });
    }
  }

  //DELETE ONE
  static async deleteThisPlant(req, res) {
    const plant_id = req.params.id;
    const user_id = req.tokenObj.user_id;
    try {
      const plant = await Plant.getOneOfMyPlants(user_id, plant_id);
      await plant.deleteThisPlant();
      res.status(204).end();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PlantController;
