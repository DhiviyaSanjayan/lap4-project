import { useState } from "react";
import { useGarden } from "../../../../contexts";
import styles from "./style.module.css";

import axiosConfig from "../../../../../../utils/axiosConfig";
import axios from "axios";

export default function WaterFertilise({
  plant_id,
  soil_moisture,
  soil_fertility,
}) {
  const { setPlantOptions, setPlants } = useGarden();
  const [waterInput, setWaterInput] = useState("");
  const [fertiliseInput, setFertiliseInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log(data);
        setPlants((plants) => {
          const index = plants.findIndex(
            (plant) => plant.plant_id !== plant_id
          );
          plants.splice(index - 1, 1, data);
          return plants;
        });
        setPlantOptions("");
      } catch (error) {
        console.log(error);
      }
    };

    changeSoilMoisFert();
  };

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="water">Water</label>
          <input
            type="number"
            name="water"
            min={0}
            value={waterInput}
            data-testid="water-input"
            onChange={(e) => setWaterInput(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="fertilise">Fertilise</label>
          <input
            type="number"
            name="fertilise"
            min={0}
            value={fertiliseInput}
            data-testid="fertilise-input"
            onChange={(e) => setFertiliseInput(e.target.value)}
          />
        </fieldset>
        <button
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
