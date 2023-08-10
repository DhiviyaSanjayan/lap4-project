const { Router } = require("express");
const authenticator = require("../middleware/authenticator");
const UserController = require("../controllers/user.js");

const userRouter = Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.use(authenticator);

userRouter.get("/details", UserController.getUserDetails);
userRouter.patch("/update", UserController.updateUserDetails);
userRouter.delete("/logout", UserController.logout);
userRouter.delete("/", UserController.deleteUser);

module.exports = userRouter;
