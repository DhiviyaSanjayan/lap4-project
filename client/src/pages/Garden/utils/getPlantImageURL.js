import axios from "axios";

export default async function getPlantImageURL(pic_filename) {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      responseType: "blob",
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/images/${pic_filename}`,
      config
    );
    return URL.createObjectURL(data);
  } catch (error) {
    console.log(error);
  }
}
