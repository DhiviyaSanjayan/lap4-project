const request = require("supertest");
const app = require("../../app");

/**
 * Create new token with a username and password
 * 
 * @param {string} username - username for user
 * @param {string} password - password for user
 * @returns {Promise<string>} token - an id used to identify the user
 */
async function getValidToken(username, password) {
  //Create an account and login, getting the token at the end of it
  const registerDetails = { username, password };

  await request(app).post("/users/register").send(registerDetails);
  const response = await request(app)
    .post("/users/login")
    .send(registerDetails);
  
  return response.body.token;
}

module.exports = getValidToken;
