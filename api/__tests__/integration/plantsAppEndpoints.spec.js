const request = require("supertest");
const apiServer = require("../../app"); // Update the path to your app file

global.request = request;
global.app = apiServer;

const {
  createDbEnv,
  populateDbEnv,
  destroyDbEnv,
} = require("../../database/setup-test-db"); // Update the path accordingly

describe("PlantApp endpoints", () => {
  let api;

  beforeAll(async () => {
    await createDbEnv(); // Set up the test database environment
    await populateDbEnv(); // Populate the test database with initial data

    api = app.listen(5002, () =>
      console.log("Test server running on port 5002")
    );
  });

  afterAll(async () => {
    await destroyDbEnv(); // Tear down the test database environment

    console.log("Gracefully stopping test server");
    await api.close();
  });

  // Your test cases go here
});
