const { Router } = require("express");
const openaiController = require("../controllers/openai.js");
const openaiRouter = Router();

openaiRouter.post("/", openaiController.generate);

module.exports = openaiRouter;
