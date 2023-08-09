const express = require("express");
const cors = require("cors");

const logRoutes = require("./middleware/logger");
const userRouter = require("./routers/user");
// const plantRouter = require("./routers/plant");
const visionaiRouter = require("#./routers/visionai")

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Plant",
    description: "Welcome to our plants world!",
  });
});

app.use("/users", userRouter);
// app.use("/plants", plantRouter);
app.use("/visionai", visionaiRouter);

module.exports = app;
