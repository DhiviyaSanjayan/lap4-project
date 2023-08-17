import axios from "axios";

const getPerenualData = async (id) => {
  const key = import.meta.env.VITE_PERENUAL_KEY ?? "sk-q9eK64d756aa381e91851";
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
