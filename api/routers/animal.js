const { Router } = require("express");
const AnimalController = require("../controllers/animal.js");
const authenticator = require("../middleware/authenticator");

const animalRouter = Router();
animalRouter.use(authenticator);

animalRouter.get("/", AnimalController.getAllAnimals);
animalRouter.post("/", AnimalController.createAnimal);
animalRouter.get("/:id", AnimalController.getAnimalDetails);
animalRouter.patch("/:id", AnimalController.updateAnimal);
animalRouter.delete("/:id", AnimalController.deleteAnimal);

module.exports = animalRouter;
