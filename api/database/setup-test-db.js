const db = require("./connect.js");

const createDbEnv = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS token");
    await db.query("DROP TABLE IF EXISTS plants");
    await db.query("DROP TABLE IF EXISTS users CASCADE");
  } catch (error) {
    console.error("Error dropping database tables:", error);
    throw error;
  }
  try {
    await db.query(`CREATE TABLE users (
            user_id INT GENERATED ALWAYS AS IDENTITY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password CHAR(60) UNIQUE NOT NULL,
            PRIMARY KEY (user_id)
        )`);

    await db.query(`CREATE TABLE token (
        token_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL,
        token CHAR(36) UNIQUE NOT NULL,
        PRIMARY KEY (token_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`);

    // Additional table creation if needed...
  } catch (error) {
    console.error("Error creating database tables:", error);
    throw error;
  }
};

const populateDbEnv = async () => {
  try {
    await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ('Nastasia', 'Smith', 'nsm@mail.com', '123')"
    );
    // Additional data population if needed...
  } catch (error) {
    console.error("Error populating database:", error);
    throw error;
  }
};

const destroyDbEnv = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS token");
    await db.query("DROP TABLE IF EXISTS plants");
    await db.query("DROP TABLE IF EXISTS users CASCADE");
  } catch (error) {
    console.error("Error dropping database tables:", error);
    throw error;
  }
};

module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };
