import { useLayoutEffect, useState } from "react";
import { useGarden } from "../../contexts";
import WaterFertilise from "./components/WaterFertilise";
import getPlantImageURL from "../../utils/getPlantImageURL";
import getPerenualData from "../../utils/getPerenualData";

import styles from "./style.module.css";

export default function PlantOptions({ plantOptions, setPlantOptions, plants }) {
  return (
    <div
      className={`${styles["container"]} ${
        !plantOptions ? styles["transition"] : ""
      }`}
    >
      {plantOptions &&
        (() => {
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
            <div className={styles["pop-up"]}>
              <button onClick={() => setPlantOptions("")}>X</button>
              <div>
                <div>{pet_name}</div>
                <img src={imageURL} alt={`A picture of ${pet_name}`} />
              </div>
              <div>{plant_name}</div>
              <div>{soil_fertility}</div>
              <div>{soil_moisture}</div>
              <div>{creation_date}</div>
              <div>{plant_exp}</div>
              <WaterFertilise
                {...{ soil_moisture, soil_fertility, plant_id }}
              />
              <div>{description}</div>
              <div>{wellbeing}</div>
              <div>{plant_beauty}</div>
            </div>
          );
        })()}
    </div>
  );
}
