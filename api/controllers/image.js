const path = require("path");

class ImageController {
  static async getPlantImageByFilename(req, res) {
    const filename = req.params.id;
      try {
        console.log("hello");
      res.sendFile(path.join(__dirname, `../uploads/plants/${filename}`));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ImageController;
