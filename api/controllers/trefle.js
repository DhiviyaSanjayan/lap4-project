require("dotenv").configuration;
const axios = require("axios");

class Trefle {
  static async trefleFetch(req, res) {
    const path = req.path;
    try {
      const tokenQuery = `?token=${process.env.TREFLE_TOKEN}`;
      const { data } = await axios.get(
        `https://trefle.io/api/v1${path}${tokenQuery}`
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Trefle;
