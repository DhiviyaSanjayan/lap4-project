const { Router } = require("express");
const gardenController = require("../controllers/garden.js");

const gardenRouter = Router();

gardenRouter.get("/", gardenController.index);
gardenRouter.post("/", gardenController.create);
gardenRouter.delete("/:id", gardenController.destroy);
gardenRouter.patch("/:id", gardenController.update);
gardenRouter.get("/:id", gardenController.show);

module.exports = gardenRouter;