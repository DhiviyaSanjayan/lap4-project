import { useState, useLayoutEffect } from "react";
import { useGarden } from "../../../../../../contexts";
import styles from "./style.module.css";

import axiosConfig from "../../../../../../../../utils/axiosConfig";
import axios from "axios";

export default function WaterFertilise({
  plant_id,
  soil_moisture,
  soil_fertility,
}) {
  const { setPlants } = useGarden();

  const [waterInput, setWaterInput] = useState(0);
  const [fertiliseInput, setFertiliseInput] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFertiliseInput(0);
    setWaterInput(0);

    const changeSoilMoisFert = async () => {
      const body = {
        soil_moisture: soil_moisture + +waterInput,
        soil_fertility: soil_fertility + +fertiliseInput,
      };

      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_SERVER}/plants/${plant_id}`,
          body,
          axiosConfig()
        );
        setPlants((plants) => {
          const index = plants.findIndex((plant) => plant.plant_id == plant_id);
          plants[index] = data;
          return [...plants].sort((a, b) => a.plant_id < b.plant_id);
        });
      } catch (error) {
        console.log(error);
      }
    };

    changeSoilMoisFert();
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["prompt"]}>Water or fertilise your plant</div>
      <form className={styles["inner-container"]} onSubmit={handleSubmit}>
        <div className={styles["water-input"]}>
          <div>Water</div>
          <input
            type="number"
            name="water"
            min={0}
            size={1}
            value={waterInput}
            data-testid="water-input"
            onChange={(e) => setWaterInput(e.target.value)}
          />
        </div>
        <div className={styles["fertilise-input"]}>
          <div>Fertiliser</div>
          <input
            type="number"
            name="fertilise"
            min={0}
            size="1"
            value={fertiliseInput}
            data-testid="fertilise-input"
            onChange={(e) => setFertiliseInput(e.target.value)}
          />
        </div>
        <button
          className={styles["submit"]}
          disabled={
            soil_moisture + +waterInput > 100 ||
            soil_fertility + +fertiliseInput > 100
          }
          type="submit"
        >
          Add To Plant
        </button>
      </form>
    </div>
  );
}
