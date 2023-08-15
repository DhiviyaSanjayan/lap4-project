const { Router } = require("express");

const ImageController = require("../controllers/image");

const imageRouter = Router();

//READ ONE
imageRouter.get("/:id", ImageController.getPlantImageByFilename);

module.exports = imageRouter;
