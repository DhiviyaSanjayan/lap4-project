const Token = require("../models/token");

async function authenticator(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No Authorization Header");
      throw new Error("User not authenticated");
    }

    const token = authHeader.split(" ")[1]; // Extract token from header
    console.log("Received Token:", token);

    const tokenObj = await Token.getOneByToken(token);
    console.log("Token Object:", tokenObj);

    req.tokenObj = tokenObj;
    next();
  } catch (error) {
    console.log("Authenticator Error:", error);
    res.status(403).json({ error: "User not authenticated" });
  }
}

module.exports = authenticator;
