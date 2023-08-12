const { Router } = require("express");

const TrefleController = require("../controllers/trefle");

const trefleRouter = Router();

trefleRouter.post("/plant/find", TrefleController.identifyMyPlant);

module.exports = trefleRouter;
