const db = require("../database/connect");

class User {
  constructor({
    user_id,
    username,
    password,
    exp,
    coins,
    creation_date,
    last_refresh,
    last_login_time,
    last_logout_time,
  }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.exp = exp;
    this.coins = coins;
    this.creation_date = creation_date;
    this.last_refresh = last_refresh;
    this.last_login_time = last_login_time;
    this.last_logout_time = last_logout_time;
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

  async updateUserDetails({
    exp = this.exp,
    coins = this.coins,
    last_logout_time = this.last_logout_time,
    last_login_time = this.last_login_time,
  }) {
    const values = [
      exp,
      coins,
      last_logout_time,
      last_login_time,
      this.user_id,
    ];
    try {
      let response = await db.query(
        "UPDATE user_account SET exp = $1, coins = $2, last_logout_time = $3, last_login_time = $4, last_refresh = CURRENT_TIMESTAMP WHERE user_id = $5 RETURNING user_id;",
        values
      );
      const userId = response.rows[0].user_id;
      const updatedUser = await User.getOneById(userId);
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      console.error("Error updating user details in model:", error);
      throw error;
    }
  }

  async deleteUser() {
    //delete all records related to user in other tables
    //PLANT
    await db.query("DELETE FROM plant WHERE user_id = $1;", [this.user_id]);
    //DISPLAY
    await db.query("DELETE FROM display WHERE user_id = $1;", [this.user_id]);
    //ANIMAL
    await db.query("DELETE FROM animal WHERE user_id = $1;", [this.user_id]);
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
