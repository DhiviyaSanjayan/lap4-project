import { useState } from "react";
import { useGarden } from "../../../../contexts";
import styles from "./style.module.css";

import axiosConfig from "../../../../../../utils/axiosConfig";
import axios from "axios";

export default function IncreaseWellbeing({ animal_id, wellbeing, count }) {
  const { setAnimals, setUser, user } = useGarden();
  const [input, setInput] = useState("");
  const [cost, setCost] = useState("");

  const COST_FOR_1 = count * 2;

  const handleSubmit = (e) => {
    e.preventDefault();

    const increaseWellbeing = async () => {
      try {
        const body1 = {
          wellbeing: wellbeing + +input,
        };
        const { data: data1 } = await axios.patch(
          `${import.meta.env.VITE_SERVER}/animals/${animal_id}`,
          body1,
          axiosConfig()
        );

        const body2 = {
          coins: user.coins - +cost,
        };
        const { data: data2 } = await axios.patch(
          `${import.meta.env.VITE_SERVER}/users/update`,
          body2,
          axiosConfig()
        );

        setAnimals((animals) => {
          const index = animals.findIndex(
            (animal) => animal.animal_id !== animal_id
          );
          console.log(index);
          animals.splice(index - 1, 1, data1);
          return animals;
        });
        setUser(data2);
      } catch (error) {
        console.log(error);
      }
    };

    increaseWellbeing();
  };

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="wellbeing">Wellbeing</label>
          <input
            type="number"
            name="wellbeing"
            value={input}
            min={0}
            data-testid="wellbeing-input"
            onChange={(e) => {
              setInput(e.target.value);
              setCost(input * COST_FOR_1);
            }}
          />
        </fieldset>
        <div>Cost: {cost}</div>
        <button disabled={user.coins < cost || wellbeing + +input > 100 } type="submit">
          Increase Wellbeing
        </button>
      </form>
    </div>
  );
}
