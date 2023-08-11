require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/token");

class UserController {
  static async register(req, res) {
    try {
      const data = req.body;
      const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

      const salt = await bcrypt.genSalt(rounds);
      data["password"] = await bcrypt.hash(data["password"], salt);

      const result = await User.createUser(data);

      res.status(201).send(result);
    } catch (error) {
      // console.log(error);
      switch (+error.code) {
        case 23505:
          res
            .status(500)
            .json({ error: "A user with this username already exists" });
          break;
        default:
          res.status(500).json({ error: error.message });
          break;
      }
    }
  }

  static async login(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneByUsername(data.username);
      const authenticated = await bcrypt.compare(
        data.password,
        user["password"]
      );
      if (!authenticated) {
        throw new Error("Wrong username or password");
      } else {
        // Set last_login_time before creating token
        const loginData = {
          login: true,
          last_login_time: new Date().toISOString(),
        };
        await user.updateUserDetails(loginData);

        const token = await Token.create(user["user_id"]);
        res.status(201).json({
          authenticated: true,
          token: token.token,
          user: user.username,
        });
      }
    } catch (error) {
      // console.log(error);
      res.status(403).json({ error: error.message });
    }
  }

  static async getUserDetails(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const result = await User.getOneById(user_id);
      delete result.password;
      res.status(200).send(result);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  static async updateUserDetails(req, res) {
    const user_id = req.tokenObj.user_id;
    const data = req.body;

    if (data.logout) {
      data.last_logout_time = new Date().toISOString();
    } else if (data.login) {
      data.last_login_time = new Date().toISOString();
    }

    try {
      const user = await User.getOneById(user_id);
      console.log("Updating user details with data:", data);
      const result = await user.updateUserDetails(data);
      console.log("User details updated:", result);
      res.status(202).send(result);
    } catch (error) {
      console.error("Error updating user details:", error);
      res.status(304).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    const tokenObj = req.tokenObj;
    try {
      const user = await User.getOneById(tokenObj.user_id);

      const logoutData = {
        logout: true,
        last_logout_time: new Date().toISOString(),
      };
      const updatedUser = await user.updateUserDetails(logoutData);

      await tokenObj.deleteToken();

      res.status(202).json({
        message: "Your token has been deleted and you've been logged out",
        user: updatedUser,
      });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    const user_id = req.tokenObj.user_id;
    try {
      const userToDelete = await User.getOneById(user_id);
      await userToDelete.deleteUser();
      res
        .status(204)
        .json({ message: "You're Account Has Been Successfully Deleted" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
