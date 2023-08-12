require("dotenv").config();
const axios = require("axios");

const getPerenualData = async (id) => {
  const key = process.env.PERENUAL_KEY;
  try {
    const { data } = await axios.get(
      `https://perenual.com/api/species/details/${id}?key=${key}`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = getPerenualData;
