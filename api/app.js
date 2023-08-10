const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const userRouter = require("./routers/user");
const trefleRouter = require("./routers/trefle");
// const plantRouter = require("./routers/plant");
const visionaiRouter = require("./routers/visionai")

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('tiny'));

app.get("/", (req, res) => {
  res.json({
    name: "Plant",
    description: "Welcome to our plants world!",
  });
});

app.use("/users", userRouter);
app.use("/trefle-api", trefleRouter)
// app.use("/plants", plantRouter);
app.use("/visionai", visionaiRouter);

module.exports = app;
