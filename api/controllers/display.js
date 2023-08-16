const Display = require("../models/Display.js");

class DisplayController {
  //READ ONE
  static async getMyDisplay(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const display = await Display.getMyDisplay(user_id);
      res.status(200).json(display);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  //CREATE ONE
  static async createMyDisplay(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const display = await Display.createMyDisplay(user_id, req.body);
      res.status(201).json(display);
    } catch (error) {
      // console.log(error);
      switch (+error.code) {
        case 23502:
          res.status(412).json({
            error: "You're display requires a name to be successfully created",
          });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  }

  //UPDATE ONE
  static async updateThisDisplay(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = req.body;
    try {
      const display = await Display.getMyDisplay(user_id);
      const result = await display.updateThisDisplay(data);
      res.status(202).json(result);
    } catch (error) {
      // console.log(error);
      res.status(304).json({ error: error.message });
    }
  }

  //DELETE ONE
  static async deleteThisDisplay(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const display = await Display.getMyDisplay(user_id);
      await display.deleteThisDisplay();
      res.status(204).end();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DisplayController;
