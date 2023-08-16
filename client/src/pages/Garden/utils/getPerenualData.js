import axios from "axios";

const getPerenualData = async (id) => {
  const key = import.meta.env.VITE_PERENUAL_KEY ?? "sk-jeE564d6cf901cf241798";
  try {
    const { data } = await axios.get(
      `https://perenual.com/api/species/details/${id}?key=${key}`
    );
    console.log(data)
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default getPerenualData;
