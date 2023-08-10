const { Router } = require("express");
const gardenController = require("../controllers/garden.js");
const authenticator = require("../middleware/authenticator");

const gardenRouter = Router();

gardenRouter.use(authenticator);

gardenRouter.get("/", gardenController.index);
gardenRouter.post("/", gardenController.create);
gardenRouter.delete("/:id", gardenController.destroy);
gardenRouter.patch("/:id", gardenController.update);
gardenRouter.get("/:id", gardenController.show);

module.exports = gardenRouter;