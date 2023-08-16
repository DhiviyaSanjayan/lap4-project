import {useLayoutEffect, useState} from "react";
import getPlantImageURL from "../../utils/getPlantImageURL";

export default function Plant({ pData }) {
  const [imageData, setImageData] = useState();
  const {
    plant_id,
    user_id,
    pet_name,
    plant_name,
    perenual_id,
    pic_filename,
    wellbeing,
    plant_beauty,
    plant_exp,
    soil_moisture,
    soil_fertility,
    creation_date,
  } = pData;
  
  useLayoutEffect(() => {
    (async () => {
      setImageData(await getPlantImageURL(pic_filename))
    })()
  },[])
    
  return imageData && <div><img src={imageData} alt="" /></div>;
}
