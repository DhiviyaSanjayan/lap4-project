require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const setupMockDB = async () => {
  const db = new Pool({
    connectionString: process.env.TEST_DB_URL,
  });

  const sql = fs.readFileSync(path.join(__dirname, "./setup.sql")).toString();

  try {
    console.log("Initializing mock database setup...");
    console.log("Executing SQL statements...");

    await db.query(sql);
    db.end();

    console.log("Mock Database Setup Complete 👍");
  } catch (error) {
    console.error("Error during mock database setup:");
    console.error(error);
  }
};

module.exports = setupMockDB;
