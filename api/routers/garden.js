const { Router } = require("express");
const gardenController = require("../controllers/garden.js");
const authenticator = require("../middleware/authenticator");

const gardenRouter = Router();

gardenRouter.use(authenticator);

gardenRouter.get("/", gardenController.getMyGarden);
gardenRouter.post("/", gardenController.createMyGarden);
gardenRouter.patch("/", gardenController.updateThisGarden);
gardenRouter.delete("/", gardenController.deleteThisGarden);

module.exports = gardenRouter;
