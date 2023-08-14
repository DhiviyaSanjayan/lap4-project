require("dotenv").configuration;
const axios = require("axios");

class TrefleController {
  static async identifyMyPlant(req, res) {
    const bodyEntries = Object.entries(req.body).filter((entry) => entry[1]);
    const filterStrings = bodyEntries.map(
      ([key, value]) => `[${key}]=${value}`
    );

    const allFiltersString = filterStrings.join("&");

    const tokenQuery = `token=${process.env.TREFLE_TOKEN}`;
    const { status, data } = await axios.get(
      `https://trefle.io/api/v1/plants?filter${allFiltersString}&${tokenQuery}`
    );
    res.status(status).json(data);
  }
}

module.exports = TrefleController;
