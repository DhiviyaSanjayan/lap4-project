const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const userRouter = require("./routers/user");
const animalRouter = require("./routers/animal");
const trefleRouter = require("./routers/trefle");
// const plantRouter = require("./routers/plant");

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

app.use("/users", userRouter);
app.use("/animal", animalRouter);
app.use("/trefle-api", trefleRouter);
// app.use("/plants", plantRouter);

module.exports = app;
