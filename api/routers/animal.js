const { Router } = require("express");
const AnimalController = require("../controllers/animal.js");
const authenticator = require("../middleware/authenticator");

const animalRouter = Router();

animalRouter.use(authenticator);

//CREATE ONE
animalRouter.post("/", AnimalController.createAnAnimal);
//READ ALL
animalRouter.get("/", AnimalController.getAllMyAnimals);
//CREATE ONE
animalRouter.get("/:id", AnimalController.getOneOfMyAnimals);
//UPDATE ONE
animalRouter.patch("/:id", AnimalController.updateThisAnimal);
//DELETE ONE
animalRouter.delete("/:id", AnimalController.deleteThisAnimal);

module.exports = animalRouter;
