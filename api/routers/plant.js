const { Router } = require("express");

const authenticator = require("../middleware/authenticator");
const PlantController = require("../controllers/plant");
const upload = require("../middleware/plant/upload.js")
const removebg = require("../middleware/plant/removebg.js")

const plantRouter = Router();

plantRouter.use(authenticator);

// plantRouter.use(upload.single("plant_pic"));
// plantRouter.use(removebg)

//CREATE ONE
plantRouter.post("/", upload.single("plant_pic"), removebg, PlantController.createAPlant);
//READ ALL
plantRouter.get("/", PlantController.getAllMyPlants);
//READ ONE
plantRouter.get("/:id", PlantController.getOneOfMyPlants);
//UPDATE ONE
plantRouter.patch("/:id", PlantController.updateThisPlant);
//DELETE ONE
plantRouter.delete("/:id", PlantController.deleteThisPlant);

module.exports = plantRouter;
