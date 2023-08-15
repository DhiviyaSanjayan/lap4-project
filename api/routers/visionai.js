const { Router } = require("express");
const upload = require('../middleware/upload');
const visionaiController = require("../controllers/visionai.js");
const visionaiRouter = Router();

visionaiRouter.post("/", upload.single('image'), visionaiController.upload);

module.exports = visionaiRouter;
