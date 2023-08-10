const Garden = require("../models/Garden.js");

class GardenController {
  static async getMyGarden(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const garden = await Garden.getMyGarden(user_id);
      res.status(200).json(garden);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  static async createMyGarden(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const garden = await Garden.createMyGarden(user_id, req.body);
      res.status(201).json(garden);
    } catch (error) {
      // console.log(error);
      switch (+error.code) {
        case 23502:
          res.status(412).json({
            error:
              "You're missing the input fields required for successfully creating your garden",
          });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  }

  static async updateThisGarden(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = req.body;
    try {
      const garden = await Garden.getMyGarden(user_id);
      const result = await garden.updateThisGarden(data);
      res.status(202).json(result);
    } catch (error) {
      // console.log(error);
      res.status(304).json({ error: error.message });
    }
  }

  static async deleteThisGarden(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const garden = await Garden.getMyGarden(user_id);
      await garden.deleteThisGarden();
      res.status(204).end();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GardenController;
