require("dotenv").configuration;
const axios = require("axios");

class Trefle {
  static async trefleFetch(req, res) {
    const path = req._parsedUrl.path;
    console.log(path);
    try {
      const tokenQuery = `token=${process.env.TREFLE_TOKEN}`;

      const { status, data } = await axios.get(
        `https://trefle.io/api/v1${path}${
          !path.includes("?") ? "?" : "&"
        }${tokenQuery}`
      );
      res.status(status).json(data);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Trefle;
