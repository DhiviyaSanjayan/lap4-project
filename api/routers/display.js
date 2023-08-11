const { Router } = require("express");
const displayController = require("../controllers/display.js");
const authenticator = require("../middleware/authenticator.js");

const displayRouter = Router();

displayRouter.use(authenticator);

//READ ONE
displayRouter.get("/", displayController.getMyDisplay);
//CREATE ONE
displayRouter.post("/", displayController.createMyDisplay);
//UPDATE ONE
displayRouter.patch("/", displayController.updateThisDisplay);
//DELETE ONE
displayRouter.delete("/", displayController.deleteThisDisplay);

module.exports = displayRouter;
