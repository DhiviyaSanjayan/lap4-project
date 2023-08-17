import { useLayoutEffect, useState } from "react";
import WaterFertilise from "./components/WaterFertilise";
import getPlantImageURL from "../../../../utils/getPlantImageURL";
import { ReactComponent as Cross } from "../../../../../../assets/cross-circle.svg";
import getPerenualData from "../../../../utils/getPerenualData";

import styles from "./style.module.css";

export default function PlantOptions({
  plantOptions,
  setPlantOptions,
  plants,
}) {
  const [imageURL, setImageURL] = useState();
  const [description, setDescription] = useState("");
  const {
    plant_id,
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
  } = plants.find((plant) => plant.plant_id === plantOptions);

  useLayoutEffect(() => {
    (async () => {
      setImageURL(await getPlantImageURL(pic_filename));
      setDescription((await getPerenualData(perenual_id))["description"]);
    })();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <button className={styles["close"]} onClick={() => setPlantOptions("")}>
          <Cross />
        </button>
        <div>
          <div>{pet_name}</div>
          <img src={imageURL} alt={`A picture of ${pet_name}`} />
        </div>
        <div>Plant Name: {plant_name}</div>
        <div>Creation Date: {new Date(creation_date).toLocaleDateString()}</div>
        <div>Plant Points{plant_exp}</div>
        <div>Wellbeing: {wellbeing}</div>
        <div>Plant Beauty: {plant_beauty}</div>
      </div>
      <div className={styles["right"]}>
        <div>{description}</div>
        <div>Soil Fertility: {soil_fertility}</div>
        <div>SoilMoisture: {soil_moisture}</div>
        <WaterFertilise {...{ soil_moisture, soil_fertility, plant_id }} />
      </div>
    </div>
  );
}
