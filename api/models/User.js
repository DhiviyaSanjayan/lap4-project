const db = require("../database/connect");

class User {
  constructor({ user_id, first_name, last_name, email, password }) {
    this.id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM users;");
    if (response.rows.length === 0) {
      throw new Error("Unable to get users.");
    }
    return response.rows.map((user) => new User(user));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByEmail(email) {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { first_name, last_name, email, password } = data;

    let response = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id;",
      [first_name, last_name, email, password]
    );

    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
  async destroy() {
    const response = await db.query("DELETE FROM users WHERE user_id = $1", [
      this.id,
    ]);
    if (response.rowCount !== 1) {
      throw new Error("Unable to locate user.");
    }
    return "User deleted successfully.";
  }

  async update(data) {
    const { first_name, last_name, email, password } = data;

    const response = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE user_id = $5 RETURNING *;",
      [first_name, last_name, email, password, this.id]
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to update user.");
    }

    this.first_name = response.rows[0].first_name;
    this.last_name = response.rows[0].last_name;
    this.email = response.rows[0].email;
    this.password = response.rows[0].password;

    return this;
  }
}

module.exports = User;
