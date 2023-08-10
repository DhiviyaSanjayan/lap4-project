const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const PlantController = require("../controllers/plant");

const plantRouter = Router();

plantRouter.use(authenticator);

//CREATE ONE
plantRouter.post("/", PlantController.createAPlant);
//READ ALL
plantRouter.get("/", PlantController.getAllMyPlants);
//READ ONE
plantRouter.get("/:id", PlantController.getOneOfMyPlantsByPlantId);
//UPDATE ONE
plantRouter.patch("/:id", PlantController.updateMyPlant);
//DELETE ONE
plantRouter.delete("/:id", PlantController.deleteMyPlant);

module.exports = plantRouter;
