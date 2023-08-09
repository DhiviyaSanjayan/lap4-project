const { Router } = require("express");

const visionaiController = require("../controllers/visionai.js");

const upload = require('./fileUploadMiddleware');

const visionaiRouter = Router();

visionaiRouter.post('/', upload.single('file'), visionaiController.index);

module.exports = visionaiRouter;
