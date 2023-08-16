import { useState } from "react";
import { useGarden } from "../../../../contexts";
import styles from "./style.module.css";

import axiosConfig from "../../../../../../utils/axiosConfig";
import axios from "axios";

export default function IncreaseCount({ animal_id, count }) {
  const { setAnimals, setUser, user } = useGarden();
  const [input, setInput] = useState("");
  const [cost, setCost] = useState("");
  const COST_FOR_1 = 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    const increaseCount = async () => {
      try {
        const body1 = {
          count: count + +input,
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
        console.log(data1);
        setAnimals((animals) => {
          const index = animals.findIndex(
            (animal) => animal.animal_id !== animal_id
          );
          animals.splice(index - 1, 1, data1);
          return animals;
        });

        setUser(data2);
      } catch (error) {
        console.log(error);
      }
    };

    increaseCount();
  };

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="count">Count</label>
          <input
            type="number"
            name="count"
            min={0}
            value={input}
            data-testid="count-input"
            onChange={(e) => {
              setInput(e.target.value);
              setCost(input * COST_FOR_1);
            }}
          />
        </fieldset>
        <div>Cost: {cost}</div>
        <button disabled={user.coins < cost} type="submit">
          Increase Count
        </button>
      </form>
    </div>
  );
}
