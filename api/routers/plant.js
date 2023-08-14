const { Router } = require("express");

const authenticator = require("../middleware/authenticator");
const PlantController = require("../controllers/plant");
const upload = require("../middleware/plant/upload.js")

const plantRouter = Router();

plantRouter.use(authenticator);
plantRouter.use(upload.single("plant_pic"));

//CREATE ONE
plantRouter.post("/", PlantController.createAPlant);
//READ ALL
plantRouter.get("/", PlantController.getAllMyPlants);
//READ ONE
plantRouter.get("/:id", PlantController.getOneOfMyPlants);
//UPDATE ONE
plantRouter.patch("/:id", PlantController.updateThisPlant);
//DELETE ONE
plantRouter.delete("/:id", PlantController.deleteThisPlant);

module.exports = plantRouter;
