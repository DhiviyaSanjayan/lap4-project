const { Router } = require("express");
const gardenController = require("../controllers/garden.js");
const authenticator = require("../middleware/authenticator");

const gardenRouter = Router();

gardenRouter.use(authenticator);

//READ ONE
gardenRouter.get("/", gardenController.getMyGarden);
//CREATE ONE
gardenRouter.post("/", gardenController.createMyGarden);
//UPDATE ONE
gardenRouter.patch("/", gardenController.updateThisGarden);
//DELETE ONE
gardenRouter.delete("/", gardenController.deleteThisGarden);

module.exports = gardenRouter;
