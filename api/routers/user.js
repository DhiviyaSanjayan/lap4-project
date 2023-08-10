const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const UserController = require("../controllers/user.js");

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.use(authenticator);

userRouter.get("/details", UserController.getProfileDetails);
userRouter.delete("/logout", UserController.logout);

module.exports = userRouter;
