const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const trefleRouter = require("./routers/trefle");
const userRouter = require("./routers/user");
const animalRouter = require("./routers/animal");
const plantRouter = require("./routers/plant");
const displayRouter = require("./routers/display");
const imageRouter = require("./routers/image");
const visionaiRouter = require("./routers/visionai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("tiny"));

app.get("/", (req, res) => {
  res.json({
    name: "Plant",
    description: "Welcome to our plants world!",
  });
});

app.use("/trefle", trefleRouter);
app.use("/users", userRouter);
app.use("/animals", animalRouter);
app.use("/plants", plantRouter);
app.use("/images", imageRouter);
app.use("/displays", displayRouter);
app.use("/visionai", visionaiRouter);

module.exports = app;
