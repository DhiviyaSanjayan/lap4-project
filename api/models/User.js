const db = require("../database/connect");

class User {
  constructor({ user_id, username, password, exp, coins }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.exp = exp;
    this.coins = coins;
  }

  static async getOneById(user_id) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE user_id = $1",
      [user_id]
    );
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );
    
    if (response.rows.length === 0) {
      throw new Error("User with this username doesn't exist");
    }
    return new User(response.rows[0]);
  }

  static async createUser(data) {
    const { username, password } = data;
    let response = await db.query(
      "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
      [username, password]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async updateUserDetails({ exp = this.exp, coins = this.coins }) {
    const values = [exp, coins, this.user_id];
    let response = await db.query(
      "UPDATE user_account SET exp = $1, coins = $2 WHERE user_id = $3 RETURNING user_id;",
      values
    );
    const userId = response.rows[0].user_id;
    const updatedUser = await User.getOneById(userId);
    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser() {
    //delete all records related to user in other tables
    //PLANT
    await db.query("DELETE FROM plant WHERE user_id = $1;", [this.user_id]);
    //GARDEN
    await db.query("DELETE FROM garden WHERE user_id = $1;", [this.user_id]);
    //TOKEN
    await db.query("DELETE FROM token WHERE user_id = $1;", [this.user_id]);

    const response = await db.query(
      "DELETE FROM user_account WHERE user_id = $1 RETURNING *;",
      [this.user_id]
    );
    return new User(response.rows[0]);
  }
}

module.exports = User;
