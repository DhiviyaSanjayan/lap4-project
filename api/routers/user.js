const { Router } = require("express");

const userController = require("../controllers/user.js");

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/:id", userController.destroy);
userRouter.patch("/:id", userController.update);
userRouter.get("/:id", userController.show);

module.exports = userRouter;
