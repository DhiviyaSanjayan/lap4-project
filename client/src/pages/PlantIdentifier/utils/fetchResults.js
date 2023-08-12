import axios from "axios";

export default async function fetchResults({ flowerColors, foliageColors, foliageTextures }) {
  
  const body = {
    "flower_color": String(flowerColors),
    "foliage_color": String(foliageColors),
    "foliage_texture": String(foliageTextures),
  }
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/trefle/plant/find`,body
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
