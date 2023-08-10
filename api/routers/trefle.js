const { Router } = require("express");

const TrefleController = require("../controllers/trefle");

const trefleRouter = Router();

trefleRouter.get("/:path", TrefleController.trefleFetch);

module.exports = trefleRouter;
