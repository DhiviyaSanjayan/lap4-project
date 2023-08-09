const { Router } = require("express");

const trefleController = require("../controllers/trefle");

const trefleRouter = Router();

trefleRouter.get("/:path", trefleController.trefleFetch);

module.exports = trefleRouter;
