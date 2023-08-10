const db = require("../database/connect");

class User {
  constructor({ user_id, username, password }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
  }

  static async getAllUsers() {
    try {
      const response = await db.query("SELECT * FROM user_account");
      return response.rows.map((g) => new User(g));
    } catch (error) {
      throw error;
    }
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE user_id = $1",
      [id]
    );
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("User with this username doesn't exist");
    }
    return new User(response.rows[0]);
  }

  static async createUser(data) {
    const { username, password } = data;
    try {
      let response = await db.query(
        "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
        [username, password]
      );
      const newId = response.rows[0].user_id;
      const newUser = await User.getOneById(newId);

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
